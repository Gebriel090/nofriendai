import openai from "./chatgpt";

const query = async (prompt: string, id: string, model: string) => {
  try {
    const genAI = openai;

    const geminiModel = genAI.getGenerativeModel({
      model: model || "gemini-1.5-flash-8b",
      tools: [{ codeExecution: {} }],
    });

    const generationConfig = {
      temperature: 1.5,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 1000,
      responseMimeType: "text/plain",
    };

    const chat = geminiModel.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: "Você é uma IA auxiliadora de flerte!" }],
        },
      ],
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;

    const text = response.text();

    return text || "NoFriendAI (Gemini) não encontrou uma resposta!";
  } catch (err: unknown) {
    console.error("Erro na API Gemini:", err);
    if (err instanceof Error) {
      return `Erro ao processar a solicitação: ${err.message}`;
    }
    return "Erro desconhecido";
  }
};

export default query;
