import {
  GoogleGenerativeAI
} from "@google/generative-ai";

// Mesmo nome da constante original
const openai = new GoogleGenerativeAI(process.env.OPENAI_API_KEY);

// Exportando a instância para uso externo
export default openai;
