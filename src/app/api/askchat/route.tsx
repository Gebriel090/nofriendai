 import { NextRequest, NextResponse } from "next/server";
import admin from "firebase-admin";
import { adminDB } from "@/firebaseAdmin";
import query from "../../lib/queryApi";

const ImageResponseAPI = "/iconResponseChat.png";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { prompt, id, model, session } = reqBody;

    if (!prompt) {
      return NextResponse.json(
        { message: "Por favor, providencie um prompt!" },
        { status: 400 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { message: "Por favor, providencie um ID válido!" },
        { status: 400 }
      );
    }

    const response = await query(prompt, id, model);

    const message = {
      text: response || "NoFriendAI was unable to find an answer for that!",
      createdAt: admin.firestore.Timestamp.now(),
      user: {
        _id: "NoFriendAI",
        name: "NoFriendAI",
        avatar: ImageResponseAPI, 
      },
    };

    if (!session) {
      return NextResponse.json(
        { message: "Sessão não fornecida!" },
        { status: 400 }
      );
    }

    await adminDB
      .collection("users")
      .doc(session)
      .collection("chats")
      .doc(id)
      .collection("messages")
      .add(message);

    return NextResponse.json(
      {
        success: true,
        message: "Resposta gerada com sucesso",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro no endpoint POST:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro desconhecido no servidor",
      },
      { status: 500 }
    );
  }
};