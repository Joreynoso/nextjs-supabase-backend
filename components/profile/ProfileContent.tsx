"use client";
import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase/client";
import { toast } from 'sonner';
import { User } from '@/types';
import Loading from '../loading';

export default function ProfilePage() {
    const supabase = createClient();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        full_name: "",
        role: "",
    });

    useEffect(() => {
        async function loadUser() {
            try {
                const {
                    data: { user: authUser },
                    error: userError,
                } = await supabase.auth.getUser();
                //datos completos de el usuario el roll se encuentra en user_metadata
                console.log("rol", authUser?.user_metadata?.role);
                // console.log(authUser?.user_metadata?.role);
                if (userError) throw userError;
                if (!authUser) {
                    toast.error("No hay usuario autenticado");
                    setLoading(false);
                    return;
                }

                setUser(authUser);
                setFormData({
                    full_name: authUser.user_metadata?.full_name || "",
                    role: authUser.user_metadata?.role || "user",
                });

                console.log("User:", authUser);
            } catch (err) {
                console.error("Error al cargar usuario:", err);
                toast.error("Error al cargar usuario");
            } finally {
                setLoading(false);
            }
        }

        async function accestoken() {
            const {
                data: { session },
                error,
            } = await supabase.auth.getSession();
            console.log("Token de acceso:", session?.access_token);
        }
        accestoken();
        loadUser();

        // Realtime: Escuchar cambios en la autenticación
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                console.log("Cambio en autenticación:", event);
                if (session?.user) {
                    setUser(session.user);
                    setFormData({
                        full_name: session.user.user_metadata?.full_name || "",
                        role: session.user.user_metadata?.role || "user",
                    });
                }
            }
        );

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        try {
            // Actualizar los metadatos del usuario logueado
            const { data, error } = await supabase.auth.updateUser({
                data: {
                    full_name: formData.full_name,
                    role: formData.role,
                },
            });

            if (error) throw error;

            setUser(data.user);
            setEditing(false);
            toast.success('Perfil actualizado correctamente');
        } catch (err) {
            console.error("Error al actualizar:", err);
            toast.error("Error al actualizar perfil");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className='min-h-screen flex items-center justify-center bg-background'>
                <Loading message='Cargando perfil...'/>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <p className="text-muted-foreground">
                    No se encontró el usuario
                </p>
            </div>
        );
    }

    // Render return
    return (
        <div className="min-h-screen py-10">
            <div className="max-w-5xl mx-auto px-5">
                {/* Header section */}
                <h1 className='text-3xl font-semibold tracking-tight mb-2'>User Profile</h1>
                <p className='text-muted-foreground text-base mb-8'>Manage your personal information.</p>

                <div className="bg-card border rounded-lg shadow-lg overflow-hidden">

                    {/* Formulario */}
                    <div className="p-8">
                        {!editing ? (
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm text-muted-foreground">
                                        ID de Usuario
                                    </label>
                                    <p className="text-sm text-foreground font-mono">
                                        {user.id}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm text-muted-foreground">
                                        Email
                                    </label>
                                    <p className="text-sm text-foreground font-medium">
                                        {user.email || "No especificado"}
                                    </p>
                                    {user.email_confirmed_at && (
                                        <span className="inline-flex items-center mt-1 text-xs text-green-600 dark:text-green-500">
                                            ✓ Verificado
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm text-muted-foreground">
                                        Nombre completo
                                    </label>
                                    <p className="text-sm text-foreground font-medium">
                                        {user.user_metadata?.full_name || "No especificado"}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm text-muted-foreground">
                                        Rol
                                    </label>
                                    <span className="inline-block mt-1 ml-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                                        {user.user_metadata?.role || user.role || "user"}
                                    </span>
                                </div>

                                <div>
                                    <label className="text-sm text-muted-foreground">
                                        Proveedor de autenticación
                                    </label>
                                    <p className="text-sm text-foreground">
                                        {user.app_metadata?.provider || "email"}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm text-muted-foreground">
                                        Cuenta creada
                                    </label>
                                    <p className="text-sm text-foreground">
                                        {new Date(user.created_at).toLocaleDateString("es-ES", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm text-muted-foreground">
                                        Último inicio de sesión
                                    </label>
                                    <p className="text-sm text-foreground">
                                        {user.last_sign_in_at
                                            ? new Date(user.last_sign_in_at).toLocaleDateString(
                                                "es-ES",
                                                {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                }
                                            )
                                            : "No disponible"}
                                    </p>
                                </div>

                                <button
                                    onClick={() => setEditing(true)}
                                    className="w-full mt-6 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors"
                                >
                                    Editar perfil
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleUpdate} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Nombre completo
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.full_name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, full_name: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring bg-background text-foreground"
                                        placeholder="Tu nombre completo"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Rol
                                    </label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) =>
                                            setFormData({ ...formData, role: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring bg-background text-foreground"
                                    >
                                        <option value="user">Usuario</option>
                                        <option value="admin">Administrador</option>
                                        <option value="moderator">Moderador</option>
                                        <option value="editor">Editor</option>
                                        <option value="viewer">Visualizador</option>
                                    </select>
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 disabled:bg-muted text-primary-foreground font-medium rounded-lg transition-colors"
                                    >
                                        {loading ? "Guardando..." : "Guardar cambios"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditing(false);
                                            setFormData({
                                                full_name: user.user_metadata?.full_name || "",
                                                role: user.user_metadata?.role || "user",
                                            });
                                        }}
                                        className="flex-1 px-4 py-2 border bg-background hover:bg-accent text-foreground font-medium rounded-lg transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Información adicional de metadatos */}
                {user.user_metadata && Object.keys(user.user_metadata).length > 0 && (
                    <div className="mt-6 bg-card border rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                            Metadatos del usuario
                        </h3>
                        <pre className="text-xs bg-muted p-4 rounded overflow-auto text-foreground font-mono">
                            {JSON.stringify(user.user_metadata, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}