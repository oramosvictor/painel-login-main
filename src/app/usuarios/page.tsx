"use client"

import { LayoutDashboard } from "@/components/LayoutDashboard";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Usuarios() {

    type usuario = {
        id: number,
        nome: string,
        email: string,
        permissoes: string
    }

    type usuarios = Array<usuario>

    const refForm = useRef<any>();
    const [loading, setLoading] = useState(false)
    const [usuarios, setUsuarios] = useState<usuarios>([])

    // rodar ao carregar a pagina
    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:3000/api/usuarios')
            .then((resposta) => {
                const { data } = resposta.data; // Extrair a propriedade "data" do JSON
                if (Array.isArray(data)) {
                    setUsuarios(data); // Atribuir o array de usuários à variável "usuarios"
                } else {
                    console.log('A resposta da API não contém um array de usuários válido');
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });

    }, [])

    return (
        <LayoutDashboard>
            <h1>Usuários</h1>

            {loading && <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}

            {!loading && <div className="row text-center">
                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Permissões</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario) => {
                                return (
                                    <tr key={usuario.id}>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.nome}</td>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.permissoes}</td>
                                    </tr>
                                )
                            }
                            )}
                        </tbody>
                    </table>
                </div>
            </div>}

        </LayoutDashboard>
    )
}