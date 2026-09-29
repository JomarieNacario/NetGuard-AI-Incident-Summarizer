# 🛡️ NetGuard AI: Incident Summarizer v1

# 🚀 Executive Summary
**The Mission:** Bridge the communication gap between complex network security data and actionable business intelligence.

As a U.S. Army Veteran transitioning into Cloud Support and AI Engineering, I developed NetGuard AI to solve a critical friction point identified during my IT Support and Cybersecurity training: the "Technical-to-Business" translation gap. Leveraging the Google AI Professional Certificate curriculum, this project demonstrates how generative AI acts as a force multiplier for IT teams.

### 🔑 Key Highlights
* **Cloud & AI Fluent:** Built with Gemini 3.1 Pro Preview, showcasing expertise in Google Cloud's most advanced reasoning models.
* **Domain Expertise:** Specifically tuned to identify signatures like SSH Brute Force, Nmap Reconnaissance, and TKIP vulnerabilities.

## ✨ Features
* **Log Intelligence:** Automatically identifies attack signatures and network anomalies from raw text logs.
* **Deep Reasoning:** Utilizes Gemini 3.1's "Deep Think" mode to correlate multi-stage attacks.
* **Multi-Audience Reporting:** Generates tailored summaries for C-Suite Executives, IT Managers, or Technical Teams.
* **Vibe-Coded Architecture:** Developed through natural language collaboration with AI, prioritizing rapid iteration and clean code.

## ⚙️ Technical Specifications

| Component | Specification |
| :--- | :--- |
| **Model** | `gemini-3.1-pro-preview` |
| **Context Window** | 1.04M Tokens (Ideal for massive log file synthesis) |
| **Logic** | Abstract Reasoning & Multi-step Inference |
| **Stack** | Python 3.12, Streamlit, Google Gen AI SDK |

###  🧠 Why Gemini 3.1 Pro?
I upgraded the backend to Gemini 3.1 Pro to leverage its superior abstract reasoning. In a security context, this allows the model to perform "Deep Inference"—recognizing that a port scan followed by a failed privilege escalation isn't two random events, but a coordinated attack chain.

 ## 🛠️ Installation & Usage

 ### 1. Prerequisites
* Python 3.14
* A Google AI Studio API Key [Get one here](https://aistudio.google.com/welcome)
  
 ### 2. Setup
 ```[
https://github.com/JomarieNacario/NetGuard-AI-Incident-Summarizer.git
```
``` cd netguard-ai ```  
 ``` pip install -r requirements.txt ```
 ### 3. Run the App
 ``` streamlit run app.py```

## 📂 Testing Guide

Use the provided samples in the ```/samples``` directory to test the AI's reasoning:

*```brute_force.txt```: Tests the model's ability to spot successful logins after multiple failures.

*```wlan_audit.txt```: Tests identification of legacy encryption risks (TKIP).

# 🛡️ Responsible AI & Data Privacy
This project adheres to strict **Responsible AI** principles:
 * **Data Minimization**: No PII is stored or used for model retraining.
* **Human-in-the-Loop**: All AI-generated remediation steps must be verified by a qualified professional.
* **Migration-Ready**: While prototyped in AI Studio, the architecture is documented for a secure **Vertex AI** migration to support enterprise privacy standards (see ```migration_guide.pdf```).

# 🔮 Future Roadmap

* Autonomous Remediation: Use tool-calling to automatically update firewall rules.
* Multimodal Inputs: Upload screenshots of network topology for visual analysis.
* Local LLM Support: Integration with Gemma 2 for high-privacy local processing.

# 🤝 Connect

Jomarie Nacario

[LinkedIn](https://www.linkedin.com/in/j-nacario) | [Github](https://github.com/JomarieNacario/JomarieNacario)

_Developed as a Capstone Project for the Google AI Professional Certificate._

