import { useState, useEffect, useRef } from 'react'
import PageHeader from '../components/PageHeader'

// Define TypeScript interfaces
interface Topic {
  id: string;
  name: string;
  icon: string;
  difficulty: string;
}

interface Mode {
  id: string;
  name: string;
  icon: string;
  description: string;
  prompt: string;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

interface ConversationEntry {
  role: 'user' | 'assistant';
  content: string;
}

const vivaTopics: Topic[] = [
  { id: 'ds', name: 'Data Structures', icon: '📊', difficulty: 'Intermediate' },
  { id: 'sys-design', name: 'System Design Basics', icon: '🏗️', difficulty: 'Advanced' },
  { id: 'behavioral', name: 'Behavioral Interview', icon: '💬', difficulty: 'Beginner' },
  { id: 'project-defense', name: 'Project Defense', icon: '🛡️', difficulty: 'Advanced' },
  { id: 'algorithms', name: 'Algorithms', icon: '⚡', difficulty: 'Intermediate' },
  { id: 'dbms', name: 'Database Management', icon: '🗄️', difficulty: 'Intermediate' }
]

const interviewModes: Mode[] = [
  {
    id: 'mock',
    name: 'Mock Interview',
    icon: '🎯',
    description: 'Role-specific Q&A with scoring on clarity and confidence.',
    prompt: 'You are an interviewer for a senior developer position. Ask technical questions and provide feedback on answers.'
  },
  {
    id: 'viva',
    name: 'Viva Partner',
    icon: '🤝',
    description: 'Topic-based rapid questions to sharpen your subject fundamentals.',
    prompt: 'You are a viva examiner. Ask quick conceptual questions and evaluate understanding.'
  },
  {
    id: 'study',
    name: 'Study Buddy',
    icon: '📚',
    description: 'Daily learning plan with short quizzes and revision prompts.',
    prompt: 'You are a study companion. Create engaging learning sessions with quizzes and explanations.'
  }
]

const sampleQuestions: Record<string, string[]> = {
  ds: [
    "Explain the difference between an array and a linked list.",
    "What is a hash table and how does it handle collisions?",
    "Describe the time complexity of common operations on a binary search tree."
  ],
  'sys-design': [
    "How would you design a URL shortening service like TinyURL?",
    "Explain the CAP theorem and its implications for distributed systems.",
    "Design a scalable chat application architecture."
  ],
  behavioral: [
    "Tell me about a time you had a conflict with a team member.",
    "Describe a project where you had to learn a new technology quickly.",
    "How do you handle tight deadlines and pressure?"
  ],
  'project-defense': [
    "What was the biggest technical challenge in your last project?",
    "How did you ensure code quality in your team?",
    "Explain the architecture decisions you made in your recent project."
  ],
  algorithms: [
    "Explain the difference between BFS and DFS.",
    "How would you implement a priority queue?",
    "Describe the quicksort algorithm and its time complexity."
  ],
  dbms: [
    "What is normalization and why is it important?",
    "Explain ACID properties in databases.",
    "What's the difference between SQL and NoSQL databases?"
  ]
}

function CoachPage() {
  const [selectedMode, setSelectedMode] = useState<string | null>(null)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [conversationHistory, setConversationHistory] = useState<ConversationEntry[]>([])
  const [difficultyLevel, setDifficultyLevel] = useState('intermediate')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Simulated AI response with context awareness
  const generateAIResponse = async (userMessage: string): Promise<string> => {
    setIsTyping(true)
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

    const mode = interviewModes.find(m => m.id === selectedMode)
    const topic = vivaTopics.find(t => t.id === selectedTopic)
    
    let response = ''
    
    // Intelligent response generation based on context
    if (conversationHistory.length === 0) {
      // Initial greeting based on mode and topic
      response = `👋 Welcome to ${mode?.name || 'AI Coach'} session on ${topic?.name || 'general topics'}!
      
I'm here to help you practice and improve. Let's start with a ${difficultyLevel} level question:

${getRandomQuestion(selectedTopic || 'behavioral', difficultyLevel)}

Take your time to answer, and I'll provide constructive feedback.`
    } else {
      // Generate contextual responses
      const messageCount = conversationHistory.length
      
      if (messageCount % 2 === 1) {
        // After user's answer, provide feedback and next question
        response = generateFeedback(userMessage, selectedTopic || 'behavioral', difficultyLevel)
        response += '\n\n' + getRandomQuestion(selectedTopic || 'behavioral', difficultyLevel)
      } else {
        // After our question, wait for user's answer
        response = "I'm listening. Take your time to answer the question thoroughly."
      }
    }

    setIsTyping(false)
    return response
  }

  const getRandomQuestion = (topicId: string, difficulty: string): string => {
    const questions = sampleQuestions[topicId] || sampleQuestions.behavioral
    const baseQuestion = questions[Math.floor(Math.random() * questions.length)]
    
    // Enhance question based on difficulty
    switch(difficulty) {
      case 'beginner':
        return baseQuestion
      case 'intermediate':
        return baseQuestion + " Please provide examples from your experience."
      case 'advanced':
        return baseQuestion + " Also discuss the trade-offs and alternative approaches."
      default:
        return baseQuestion
    }
  }

  const generateFeedback = (answer: string, topicId: string, difficulty: string): string => {
    const feedbackTemplates = [
      "Good answer! You've covered the key points. To improve, consider discussing real-world applications.",
      "Solid explanation. Let's dig deeper - how would this concept apply in a large-scale system?",
      "Interesting perspective. Another angle to consider is how this relates to modern best practices.",
      "Great! Your answer shows good understanding. Let's build on that with a related concept."
    ]
    
    let feedback = feedbackTemplates[Math.floor(Math.random() * feedbackTemplates.length)]
    
    if (difficulty === 'advanced') {
      feedback += " I particularly liked your mention of edge cases and performance considerations."
    }
    
    return feedback
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, userMessage])
    setConversationHistory(prev => [...prev, { role: 'user', content: inputMessage }])
    setInputMessage('')

    // Get AI response
    const aiResponseText = await generateAIResponse(inputMessage)
    
    const aiResponse: Message = {
      id: Date.now() + 1,
      text: aiResponseText,
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, aiResponse])
    setConversationHistory(prev => [...prev, { role: 'assistant', content: aiResponseText }])
  }

  const startSession = (modeId: string, topicId: string) => {
    setSelectedMode(modeId)
    setSelectedTopic(topicId)
    setMessages([])
    setConversationHistory([])
    
    // Add welcome message
    const welcomeMessage: Message = {
      id: Date.now(),
      text: `🎯 Starting ${interviewModes.find(m => m.id === modeId)?.name} session on ${vivaTopics.find(t => t.id === topicId)?.name}.
      
I'll be your AI coach today. Let's begin when you're ready!`,
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString()
    }
    setMessages([welcomeMessage])
  }

  return (
    <div className="page-stack">
      <PageHeader
        label="AI Coach"
        title="Intelligent Interview and Viva Practice"
        description="Simulate realistic interviews with our AI coach. Get instant feedback and improve your confidence."
      />

      {!selectedMode ? (
        <>
          <section className="card-surface page-card">
            <h3>Choose Practice Mode</h3>
            <div className="tile-grid">
              {interviewModes.map((mode) => (
                <article 
                  key={mode.id} 
                  className="mini-card interactive"
                  onClick={() => setSelectedMode(mode.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{mode.icon}</div>
                  <strong>{mode.name}</strong>
                  <p>{mode.description}</p>
                </article>
              ))}
            </div>
          </section>

          {selectedMode && (
            <section className="card-surface page-card">
              <h3>Select Topic</h3>
              <div className="tile-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                {vivaTopics.map((topic) => (
                  <article 
                    key={topic.id} 
                    className="mini-card interactive"
                    onClick={() => startSession(selectedMode, topic.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{topic.icon}</div>
                    <strong>{topic.name}</strong>
                    <span className="badge" style={{ 
                      background: topic.difficulty === 'Advanced' ? '#ff4444' : 
                                 topic.difficulty === 'Intermediate' ? '#ffaa00' : '#00c851',
                      color: 'white',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      marginTop: '0.5rem'
                    }}>
                      {topic.difficulty}
                    </span>
                  </article>
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        <section className="card-surface page-card" style={{ minHeight: '500px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>
              {interviewModes.find(m => m.id === selectedMode)?.name} - {vivaTopics.find(t => t.id === selectedTopic)?.name}
            </h3>
            <div>
              <select 
                value={difficultyLevel}
                onChange={(e) => setDifficultyLevel(e.target.value)}
                className="input-field"
                style={{ width: 'auto', marginRight: '1rem' }}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <button 
                onClick={() => setSelectedMode(null)}
                className="btn-outline"
              >
                End Session
              </button>
            </div>
          </div>

          <div style={{ 
            height: '400px', 
            overflowY: 'auto', 
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            {messages.map((message: Message) => (
              <div
                key={message.id}
                style={{
                  marginBottom: '1rem',
                  display: 'flex',
                  flexDirection: message.sender === 'user' ? 'row-reverse' : 'row'
                }}
              >
                <div
                  style={{
                    maxWidth: '70%',
                    padding: '0.75rem',
                    borderRadius: '12px',
                    background: message.sender === 'user' ? 'var(--primary)' : '#f0f0f0',
                    color: message.sender === 'user' ? 'white' : 'var(--text)'
                  }}
                >
                  <div style={{ marginBottom: '0.25rem', fontSize: '0.875rem', opacity: 0.8 }}>
                    {message.timestamp}
                  </div>
                  <div style={{ whiteSpace: 'pre-line' }}>{message.text}</div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div className="typing-indicator">AI is typing</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your answer here..."
              className="input-field"
              style={{ flex: 1 }}
              disabled={isTyping}
            />
            <button 
              onClick={handleSendMessage}
              className="btn-primary"
              disabled={isTyping}
            >
              Send
            </button>
          </div>

          <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
            <strong>Session Stats:</strong> Questions answered: {Math.floor(conversationHistory.length / 2)} | 
            Difficulty: {difficultyLevel} | Mode: {interviewModes.find(m => m.id === selectedMode)?.name}
          </div>
        </section>
      )}
    </div>
  )
}

export default CoachPage
