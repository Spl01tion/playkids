<?php
// ============================================================
// PlayKids – Email de Pedido de Orçamento
// SMTP: Hostinger  |  smtp.hostinger.com : 465 (SSL)
// ============================================================

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../vendor/autoload.php';

$envFile = __DIR__ . '/../.env';
if (file_exists($envFile)) {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
    $dotenv->load();
}

define('SMTP_HOST',     'smtp.hostinger.com');
define('SMTP_PORT',     465);
define('SMTP_USER',     'contacto@playkidsrainha.pt');
define('SMTP_PASSWORD', $_ENV['SMTP_PASSWORD'] ?? '');
define('MAIL_PARA',     'contacto@playkidsrainha.pt');
define('MAIL_NOME',     'PlayKids');
define('SITE_URL',      'https://www.playkidsrainha.pt');

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Método não permitido.']);
    exit;
}

$nome     = trim(filter_input(INPUT_POST, 'nome',     FILTER_SANITIZE_SPECIAL_CHARS) ?? '');
$telefone = trim(filter_input(INPUT_POST, 'telefone', FILTER_SANITIZE_SPECIAL_CHARS) ?? '');
$email    = trim(filter_input(INPUT_POST, 'email',    FILTER_SANITIZE_EMAIL)         ?? '');
$mensagem = trim(filter_input(INPUT_POST, 'mensagem', FILTER_SANITIZE_SPECIAL_CHARS) ?? '');

if (empty($nome) || empty($telefone)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Dados incompletos.']);
    exit;
}

$dataHora = date('d/m/Y \à\s H:i');

// Converter mensagem (formato WhatsApp) em HTML legível
$mensagemHtml = nl2br(htmlspecialchars(html_entity_decode($mensagem, ENT_QUOTES, 'UTF-8')));
$mensagemHtml = preg_replace('/\*([^*]+)\*/', '<strong>$1</strong>', $mensagemHtml);

// Logo
$logoPath = __DIR__ . '/../assets/img/Logo_noslogan.png';
if (file_exists($logoPath)) {
    $logoTag = '<img src="cid:pk_logo" alt="PlayKids" style="height:65px;width:auto;">';
} else {
    $logoTag = '<span style="font-size:22px;font-weight:bold;color:#fff;font-family:Arial,sans-serif;">PlayKids</span>';
}

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = SMTP_HOST;
    $mail->SMTPAuth   = true;
    $mail->Username   = SMTP_USER;
    $mail->Password   = SMTP_PASSWORD;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = SMTP_PORT;
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom(SMTP_USER, MAIL_NOME);
    $mail->addAddress(MAIL_PARA, MAIL_NOME);
    if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $mail->addReplyTo($email, $nome);
    }

    if (file_exists($logoPath)) {
        $mail->addEmbeddedImage($logoPath, 'pk_logo', 'pk_logo.png', 'base64', 'image/png');
    }

    $mail->Subject = '[PlayKids] Pedido de Orçamento — ' . $nome;
    $mail->isHTML(true);

    $mail->Body = '<!DOCTYPE html>
<html lang="pt">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:30px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.1);">

        <tr>
          <td style="background:linear-gradient(135deg,#e91e8c,#c2185b);padding:26px 40px;text-align:center;">
            ' . $logoTag . '
          </td>
        </tr>
        <tr>
          <td style="background:#fff8fd;padding:12px 40px;text-align:center;border-bottom:2px solid #f9c0e3;">
            <p style="margin:0;color:#c2185b;font-size:14px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">
              📋 Novo Pedido de Orçamento
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:30px 40px;">
            <p style="margin:0 0 22px;color:#555;font-size:14px;line-height:1.6;">
              Recebeu um novo pedido de orçamento através do website.
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
                  <span style="color:#999;font-size:11px;text-transform:uppercase;letter-spacing:.5px;">Telefone / WhatsApp</span><br>
                  <a href="https://wa.me/' . preg_replace('/\D/', '', $telefone) . '" style="color:#25D366;font-size:15px;font-weight:bold;text-decoration:none;">📱 ' . htmlspecialchars($telefone) . '</a>
                </td>
              </tr>
              ' . (!empty($email) ? '<tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0e0f5;">
                  <span style="color:#999;font-size:11px;text-transform:uppercase;letter-spacing:.5px;">E-mail</span><br>
                  <a href="mailto:' . htmlspecialchars($email) . '" style="color:#e91e8c;font-size:15px;text-decoration:none;">' . htmlspecialchars($email) . '</a>
                </td>
              </tr>' : '') . '
            </table>

            <p style="margin:0 0 8px;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:.5px;">Detalhe do Pedido</p>
            <div style="background:#fff8fd;border-left:4px solid #e91e8c;padding:16px 20px;border-radius:6px;color:#333;font-size:13px;line-height:1.8;">
              ' . $mensagemHtml . '
            </div>
          </td>
        </tr>

        <tr>
          <td style="background:#fdf0f8;padding:14px 40px;text-align:center;border-top:1px solid #f0e0f5;">
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

    $mail->AltBody = "Novo Pedido de Orçamento — PlayKids\n\nNome: {$nome}\nTelefone: {$telefone}"
        . (!empty($email) ? "\nE-mail: {$email}" : '')
        . "\n\n{$mensagem}";

    $mail->send();
    echo json_encode(['status' => 'success']);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'debug' => $mail->ErrorInfo]);
}
