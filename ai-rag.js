// Portfolio Knowledge Base (RAG Data)
const portfolioKnowledge = {
    personal: {
        name: "Mukharji V",
        title: "UI Developer",
        education: "Masters in Information Technology from American College of Commerce and Technology",
        email: "mukharjiv@outlook.com",
        phone: "+1 412-932-0039",
        linkedin: "https://linkedin.com/in/mukharji-v",
        yearsExperience: "9+"
    },
    certifications: [
        { name: "Generative AI for Developers", provider: "Microsoft" },
        { name: "Cloud Generative AI", provider: "Google" },
        { name: "Prompt Engineering", provider: "Coursera" },
        { name: "AI and Career Empowerment", provider: "University of Maryland" },
        { name: "Cryptocurrency Banking", provider: "Alison" }
    ],
    experience: [
        {
            role: "Senior UI Developer (AI Focus)",
            company: "Bio-Rad Laboratories",
            period: "Aug 2022 – Present",
            level: "Senior",
            description: "Leading development of AI powered imaging interfaces using Angular 14+, incorporating deep zoom rendering for clinical data visualization. Integrating Generative AI pipelines into enterprise platforms to automate annotation and data entry workflows. Collaborating with Machine Learning teams to build frontend components that consume AI model outputs in real time. Designing reusable Angular component libraries aligned with corporate design systems and AI design principles."
        },
        {
            role: "UI Developer / React Developer",
            company: "Reynolds American",
            period: "Oct 2019 – Jul 2022",
            level: "Mid-Senior",
            description: "Developed large scale React.js Single Page Applications with complex state management and responsive UI. Automated frontend delivery workflows using GitHub CI/CD, reducing manual code review cycles. Partnered with cross functional teams to deliver high quality, data consistent user experiences in an Agile environment."
        },
        {
            role: "Front End Developer",
            company: "Express Scripts",
            period: "May 2017 – Sep 2019",
            level: "Mid",
            description: "Built high traffic, JavaScript heavy frontend applications utilizing React.js and AngularJS. Engineered reusable UI components to streamline development across multiple product lines. Optimized applications for cross browser compatibility and mobile responsiveness."
        },
        {
            role: "Senior UI Developer",
            company: "Tylor Brands",
            period: "May 2016 – Mar 2017",
            level: "Senior",
            description: "Developed interactive UI features using JavaScript, jQuery, and MVC architectural patterns. Analyzed and improved UI performance metrics, resulting in enhanced page load speeds and maintainability."
        }
    ],
    skills: [
        { name: "AI", level: 90, category: "AI/ML" },
        { name: "LLM", level: 90, category: "AI/ML" },
        { name: "React", level: 90, category: "Frontend" },
        { name: "REST APIs", level: 90, category: "Backend" },
        { name: "Generative AI", level: 90, category: "AI/ML" },
        { name: "Prompt Engineering", level: 90, category: "AI/ML" },
        { name: "Application Security", level: 90, category: "Security" },
        { name: "Angular CLI", level: 90, category: "Frontend" },
        { name: "UI/UX Development", level: 90, category: "Frontend" }
    ],
    specialties: ["AI Specialist", "Innovation Leader", "Problem Solver"]
};

// AI RAG Agent
class PortfolioRAGAgent {
    constructor(knowledge) {
        this.knowledge = knowledge;
        this.chatHistory = [];
    }

    // Simple keyword matching and context retrieval
    retrieveContext(query) {
        const lowerQuery = query.toLowerCase();
        let context = [];

        // Experience queries
        if (lowerQuery.match(/experience|work|job|role|position|current|company/)) {
            context.push(...this.knowledge.experience);
        }

        // Skills queries
        if (lowerQuery.match(/skill|technology|tech|know|proficient|expert|angular|ai|api/)) {
            context.push(...this.knowledge.skills);
        }

        // Education queries
        if (lowerQuery.match(/education|degree|master|study|college|university|certification|cert/)) {
            context.push(this.knowledge.personal.education);
            context.push(...this.knowledge.certifications);
        }

        // Contact queries
        if (lowerQuery.match(/contact|email|reach|linkedin|connect|phone|call|number/)) {
            context.push({
                email: this.knowledge.personal.email,
                phone: this.knowledge.personal.phone,
                linkedin: this.knowledge.personal.linkedin
            });
        }

        // Personal info queries
        if (lowerQuery.match(/who|name|about|background/)) {
            context.push(this.knowledge.personal);
        }

        return context;
    }

    // Generate response based on context
    generateResponse(query) {
        const context = this.retrieveContext(query);
        const lowerQuery = query.toLowerCase();

        // Current role
        if (lowerQuery.match(/current|now|present|latest/)) {
            const current = this.knowledge.experience[0];
            return `Currently, Mukharji is working as a ${current.role} at ${current.company} since ${current.period.split('–')[0].trim()}. The role focuses on ${current.description}`;
        }

        // Skills
        if (lowerQuery.match(/skill|technology|tech/)) {
            const skillCategories = {};
            this.knowledge.skills.forEach(s => {
                if (!skillCategories[s.category]) skillCategories[s.category] = [];
                skillCategories[s.category].push(s.name);
            });
            let response = "Mukharji's key skills include:\n\n";
            for (let cat in skillCategories) {
                response += `${cat}: ${skillCategories[cat].join(', ')}\n`;
            }
            response += "\nAll skills are at 90+ proficiency level!";
            return response;
        }

        // Experience
        if (lowerQuery.match(/experience|work history|career/)) {
            let response = `Mukharji has ${this.knowledge.personal.yearsExperience} years of experience:\n\n`;
            this.knowledge.experience.forEach(exp => {
                response += `• ${exp.role} at ${exp.company} (${exp.period})\n  ${exp.description}\n\n`;
            });
            return response;
        }

        // Education
        if (lowerQuery.match(/education|degree|master/)) {
            let response = `Mukharji holds a ${this.knowledge.personal.education}.\n\nCertifications:\n`;
            this.knowledge.certifications.forEach(cert => {
                response += `• ${cert.name} - ${cert.provider}\n`;
            });
            return response;
        }

        // Certifications
        if (lowerQuery.match(/certification|cert/)) {
            let response = "Mukharji's certifications include:\n\n";
            this.knowledge.certifications.forEach(cert => {
                response += `🏆 ${cert.name} - ${cert.provider}\n`;
            });
            return response;
        }

        // Contact
        if (lowerQuery.match(/contact|email|reach|connect/)) {
            return `You can reach Mukharji at:\n📧 Email: ${this.knowledge.personal.email}\n📱 Phone: ${this.knowledge.personal.phone}\n💼 LinkedIn: ${this.knowledge.personal.linkedin}`;
        }

        // Who are you / About
        if (lowerQuery.match(/who|about|introduce|tell me about/)) {
            return `I'm Mukharji V, a ${this.knowledge.personal.title} with ${this.knowledge.personal.yearsExperience} years of experience. I specialize in creating intuitive, responsive user interfaces and integrating cutting-edge AI/ML capabilities.\n\nCurrently, I'm working at ${this.knowledge.experience[0].company} where I focus on Angular CLI, REST APIs, and Machine Learning integration. I'm passionate about ${this.knowledge.specialties.join(', ').toLowerCase()}.\n\nI hold a ${this.knowledge.personal.education} and have earned certifications from Microsoft, Google, Coursera, and more.\n\nWhat would you like to know more about?`;
        }

        // AI/ML specific
        if (lowerQuery.match(/ai|artificial intelligence|machine learning|llm/)) {
            return `Mukharji is an AI Specialist with expertise in:\n• AI & Machine Learning\n• Large Language Models (LLM)\n• Generative AI\n• Prompt Engineering\n\nCurrently integrating ML capabilities at Bio-Rad Laboratories to enhance user experiences.`;
        }

        // Angular specific
        if (lowerQuery.match(/angular|frontend|ui/)) {
            return `Mukharji specializes in UI/UX Development with strong Angular CLI expertise. Currently working on intuitive, responsive user interfaces at Bio-Rad Laboratories, focusing on optimizing applications through REST APIs.`;
        }

        // Default response
        if (context.length > 0) {
            return `I found some information that might help! Feel free to ask me more specific questions about experience, skills, certifications, or how to get in touch.`;
        }

        return "I can help you learn about Mukharji's experience, skills, education, or contact information. What would you like to know?";
    }

    chat(userMessage) {
        this.chatHistory.push({ role: 'user', content: userMessage });
        const response = this.generateResponse(userMessage);
        this.chatHistory.push({ role: 'assistant', content: response });
        return response;
    }
}

// Initialize AI Agent
const aiAgent = new PortfolioRAGAgent(portfolioKnowledge);

// UI Controls
const aiBtn = document.getElementById('aiAssistantBtn');
const aiModal = document.getElementById('aiChatModal');
const closeBtn = document.getElementById('closeChatBtn');
const chatMessages = document.getElementById('aiChatMessages');
const chatInput = document.getElementById('aiChatInput');
const sendBtn = document.getElementById('aiSendBtn');

// Toggle chat
aiBtn.addEventListener('click', () => {
    aiModal.style.display = 'flex';
    chatInput.focus();
});

closeBtn.addEventListener('click', () => {
    aiModal.style.display = 'none';
    // Clear chat history except welcome message
    const welcomeMsg = chatMessages.querySelector('.ai-message');
    chatMessages.innerHTML = '';
    if (welcomeMsg) {
        chatMessages.appendChild(welcomeMsg.cloneNode(true));
    }
    aiAgent.chatHistory = [];
});

// Send message
function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    chatInput.value = '';

    // Get AI response
    setTimeout(() => {
        const response = aiAgent.chat(message);
        addMessage(response, 'ai');
    }, 500);
}

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Quick questions
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('quick-q')) {
        const question = e.target.dataset.q;
        chatInput.value = question;
        sendMessage();
    }
});

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'ai-message';
    
    if (sender === 'user') {
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
            <div class="message-avatar">👤</div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <p>${text.replace(/\n/g, '<br>')}</p>
            </div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Close on outside click
aiModal.addEventListener('click', (e) => {
    if (e.target === aiModal) {
        aiModal.style.display = 'none';
        // Clear chat history except welcome message
        const welcomeMsg = chatMessages.querySelector('.ai-message');
        chatMessages.innerHTML = '';
        if (welcomeMsg) {
            chatMessages.appendChild(welcomeMsg.cloneNode(true));
        }
        aiAgent.chatHistory = [];
    }
});
