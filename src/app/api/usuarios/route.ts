import { NextResponse } from 'next/server'
import axios from 'axios'
import jwt from 'jsonwebtoken'

export async function GET(req: Request) {

    try {

        let usuarios = await axios.get(
            "http://localhost:3001/usuarios"
        )

        console.log(usuarios.data)

        usuarios.data.forEach((element: any) => {
            delete element.senha
        });

        return NextResponse.json({ data: usuarios.data })

    } catch (error: any) {
        console.log("error")
        return new Response(error.message, {
            status: 500
        })
        // console.log(error)
    }

    return NextResponse.json({ data: "Rota get" })
}