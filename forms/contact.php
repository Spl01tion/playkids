<?php
// ============================================================
// PlayKids – Formulário de Contacto
// SMTP: Hostinger  |  smtp.hostinger.com : 465 (SSL)
//
// Criar ficheiro .env na raiz do projeto com:
//   SMTP_PASSWORD=a_sua_password_do_email
// ============================================================

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../vendor/autoload.php';

// Carregar .env se existir
$envFile = __DIR__ . '/../.env';
if (file_exists($envFile)) {
  $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
  $dotenv->load();
}

// ── Configuração ──────────────────────────────────────────
define('SMTP_HOST',     'smtp.hostinger.com');
define('SMTP_PORT',     465);
define('SMTP_USER',     'contacto@playkidsrainha.pt');
define('SMTP_PASSWORD', $_ENV['SMTP_PASSWORD'] ?? '');
define('MAIL_PARA',     'contacto@playkidsrainha.pt');
define('MAIL_NOME',     'PlayKids');
define('SITE_URL',      'https://www.playkidsrainha.pt');
// ─────────────────────────────────────────────────────────

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['status' => 'error', 'message' => 'Método não permitido.']);
  exit;
}

// Sanitizar campos
$nome     = trim(filter_input(INPUT_POST, 'name',    FILTER_SANITIZE_SPECIAL_CHARS) ?? '');
$email    = trim(filter_input(INPUT_POST, 'email',   FILTER_SANITIZE_EMAIL)         ?? '');
$telefone = trim(filter_input(INPUT_POST, 'phone',   FILTER_SANITIZE_SPECIAL_CHARS) ?? '');
$assunto  = trim(filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_SPECIAL_CHARS) ?? '');
$mensagem = trim(filter_input(INPUT_POST, 'message', FILTER_SANITIZE_SPECIAL_CHARS) ?? '');

// Validação
if (empty($nome) || empty($email) || empty($mensagem)) {
  http_response_code(400);
  echo json_encode(['status' => 'error', 'message' => 'Preencha todos os campos obrigatórios.']);
  exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['status' => 'error', 'message' => 'Endereço de e-mail inválido.']);
  exit;
}
if (!empty($telefone) && !preg_match('/^[\+]?[\d\s\-\(\)]{8,20}$/', $telefone)) {
  http_response_code(400);
  echo json_encode(['status' => 'error', 'message' => 'Número de telefone inválido.']);
  exit;
}

$dataHora = date('d/m/Y \à\s H:i');
$assuntoLabel = $assunto ?: 'Contacto geral';

// Logo inline
$logoPath = __DIR__ . '/../assets/img/Logo_noslogan.png';
if (file_exists($logoPath)) {
  $logoTag = '<img src="cid:pk_logo" alt="PlayKids" style="height:70px;width:auto;">';
} else {
  $logoTag = '<span style="font-size:22px;font-weight:bold;color:#fff;font-family:Arial,sans-serif;">PlayKids</span>';
}

// ── Envio ─────────────────────────────────────────────────
$mail = new PHPMailer(true);

try {
  $mail->isSMTP();
  $mail->Host       = SMTP_HOST;
  $mail->SMTPAuth   = true;
  $mail->Username   = SMTP_USER;
  $mail->Password   = SMTP_PASSWORD;
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;   // SSL na porta 465
  $mail->Port       = SMTP_PORT;
  $mail->CharSet    = 'UTF-8';

  $mail->setFrom(SMTP_USER, MAIL_NOME);
  $mail->addAddress(MAIL_PARA, MAIL_NOME);
  $mail->addReplyTo($email, $nome);

  if (file_exists($logoPath)) {
    $mail->addEmbeddedImage($logoPath, 'pk_logo', 'pk_logo.png', 'base64', 'image/png');
  }

  $mail->Subject = '[PlayKids] Novo contacto — ' . $assuntoLabel . ' — ' . $nome;
  $mail->isHTML(true);

  $mail->Body = '<!DOCTYPE html>
<html lang="pt">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:30px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.1);">

        <!-- CABEÇALHO -->
        <tr>
          <td style="background:linear-gradient(135deg,#e91e8c,#c2185b);padding:28px 40px;text-align:center;">
            ' . $logoTag . '
          </td>
        </tr>

        <!-- TÍTULO -->
        <tr>
          <td style="background:#fff8fd;padding:14px 40px;text-align:center;border-bottom:2px solid #f9c0e3;">
            <p style="margin:0;color:#c2185b;font-size:14px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">
              📩 Novo Pedido de Contacto
            </p>
          </td>
        </tr>

        <!-- CORPO -->
        <tr>
          <td style="padding:32px 40px;">
            <p style="margin:0 0 24px;color:#555;font-size:14px;line-height:1.6;">
              Recebeu uma nova mensagem através do formulário de contacto do website.
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0e0f5;">
                  <span style="color:#999;font-size:11px;text-transform:uppercase;letter-spacing:.5px;">Nome</span><br>
                  <strong style="color:#2d0020;font-size:15px;">' . htmlspecialchars($nome) . '</strong>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0e0f5;">
                  <span style="color:#999;font-size:11px;text-transform:uppercase;letter-spacing:.5px;">E-mail</span><br>
                  <a href="mailto:' . htmlspecialchars($email) . '" style="color:#e91e8c;font-size:15px;text-decoration:none;">' . htmlspecialchars($email) . '</a>
                </td>
              </tr>
              ' . ($telefone ? '<tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0e0f5;">
                  <span style="color:#999;font-size:11px;text-transform:uppercase;letter-spacing:.5px;">Telefone / WhatsApp</span><br>
                  <a href="https://wa.me/' . preg_replace('/\D/', '', $telefone) . '" style="color:#25D366;font-size:15px;font-weight:bold;text-decoration:none;">📱 ' . htmlspecialchars($telefone) . '</a>
                </td>
              </tr>' : '') . '
              ' . ($assunto ? '<tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0e0f5;">
                  <span style="color:#999;font-size:11px;text-transform:uppercase;letter-spacing:.5px;">Assunto</span><br>
                  <strong style="color:#2d0020;font-size:15px;">' . htmlspecialchars($assunto) . '</strong>
                </td>
              </tr>' : '') . '
            </table>

            <p style="margin:0 0 8px;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:.5px;">Mensagem</p>
            <div style="background:#fff8fd;border-left:4px solid #e91e8c;padding:16px 20px;border-radius:6px;color:#333;font-size:14px;line-height:1.7;">
              ' . nl2br(htmlspecialchars($mensagem)) . '
            </div>
          </td>
        </tr>

        <!-- RODAPÉ -->
        <tr>
          <td style="background:#fdf0f8;padding:16px 40px;text-align:center;border-top:1px solid #f0e0f5;">
            <p style="margin:0;color:#aaa;font-size:12px;">
              Enviado em ' . $dataHora . ' &nbsp;|&nbsp;
              <a href="' . SITE_URL . '" style="color:#e91e8c;text-decoration:none;">playkidsrainha.pt</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>';

  $mail->AltBody = "Novo contacto recebido em {$dataHora}\n\nNome: {$nome}\nEmail: {$email}"
    . ($telefone ? "\nTelefone: {$telefone}" : '')
    . ($assunto  ? "\nAssunto: {$assunto}"   : '')
    . "\n\nMensagem:\n{$mensagem}";

  $mail->send();

  echo json_encode(['status' => 'success', 'message' => 'Mensagem enviada com sucesso!']);
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode([
    'status'  => 'error',
    'message' => 'Erro ao enviar a mensagem. Por favor tente novamente.',
    //'debug'   => $mail->ErrorInfo   // remover em produção
  ]);
}
