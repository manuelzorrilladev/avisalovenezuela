<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restablecer Contraseña</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1f2937;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f3f4f6; padding: 40px 10px;">
        <tr>
            <td align="center">
                <!-- Tarjeta Principal -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 520px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); border: 1px solid #e5e7eb;">
                    
                    <!-- Header con Marca / Identidad -->
                    <tr>
                        <td align="center" style="padding: 32px 32px 24px 32px; background-color: #f5bb19; border-bottom: 3px solid #000000;">
                            <img src="https://avisalovenezuela.com/assets/img/avisalo.png" alt="{{ config('app.name') }}" width="200" style="width: 200px; max-width: 100%; height: auto; display: block; margin: 0 auto; border: 0;">
                        </td>
                    </tr>

                    <!-- Cuerpo del Correo -->
                    <tr>
                        <td style="padding: 32px;">
                            <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #1e293b; text-align: center;">
                                ¡Hola, {{ $user->name }}!
                            </h2>
                            
                            <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #475569; text-align: center;">
                                Recibimos una solicitud para restablecer la contraseña de tu cuenta. No te preocupes, puedes crear una nueva credencial haciendo clic en el siguiente botón:
                            </p>

                            <!-- Botón CTA Centrado -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 28px 0;">
                                <tr>
                                    <td align="center">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                            <tr>
                                                <td align="center" style="border-radius: 8px; background-color: #f5bb19;">
                                                    <a href="{{ $resetUrl }}" target="_blank" style="display: inline-block; padding: 14px 28px; font-size: 15px; font-weight: 700; color: #000000; text-decoration: none; border-radius: 8px; background-color: #f5bb19; border: 1px solid #f5bb19; box-sizing: border-border-box; text-align: center;">
                                                        Restablecer mi contraseña
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.5; color: #64748b; text-align: center;">
                                Este enlace expirará en <strong>{{ config('auth.passwords.'.config('auth.defaults.passwords').'.expire') }} minutos</strong>. Si no realizaste esta solicitud, puedes ignorar este mensaje; tu contraseña actual permanecerá intacta.
                            </p>

                            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">

                            <!-- Subtexto de respaldo para URL -->
                            <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #94a3b8; word-break: break-all;">
                                Si tienes problemas con el botón, copia y pega la siguiente URL en tu navegador web:
                                <br>
                                <a href="{{ $resetUrl }}" style="color: #d99b00; text-decoration: underline;">{{ $resetUrl }}</a>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 32px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center;">
                            <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                                &copy; {{ date('Y') }} {{ config('app.name') }}. Todos los derechos reservados.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>