<?php
// PlayKids – Formulário de Contacto
// SMTP: Hostinger | smtp.hostinger.com:465

header('Content-Type: application/json; charset=utf-8');

// ── Localizar vendor (fora ou dentro de public_html) ─────
$autoload = null;
foreach ([__DIR__ . '/../../vendor/autoload.php', __DIR__ . '/../vendor/autoload.php'] as $_p) {
    if (file_exists($_p)) { $autoload = $_p; break; }
}
if (!$autoload) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Erro de configuração.', 'debug' => 'vendor/autoload.php nao encontrado']);
    exit;
}
require $autoload;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// ── Ler .env (fora ou dentro de public_html) ─────────────
$smtpPassword = '';
foreach ([__DIR__ . '/../../.env', __DIR__ . '/../.env'] as $_env) {
    if (file_exists($_env)) {
        $_data = parse_ini_file($_env);
        $smtpPassword = $_data['SMTP_PASSWORD'] ?? '';
        break;
    }
}

// ── Configuração ──────────────────────────────────────────
$smtpHost = 'smtp.hostinger.com';
$smtpPort = 465;
$smtpUser = 'contacto@playkidsrainha.pt';
$mailPara = 'contacto@playkidsrainha.pt';
$mailNome = 'PlayKids';
$siteUrl  = 'https://www.playkidsrainha.pt';
// ─────────────────────────────────────────────────────────

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Método não permitido.']);
    exit;
}

$nome     = trim(filter_input(INPUT_POST, 'name',    FILTER_SANITIZE_SPECIAL_CHARS) ?? '');
$email    = trim(filter_input(INPUT_POST, 'email',   FILTER_SANITIZE_EMAIL)         ?? '');
$telefone = trim(filter_input(INPUT_POST, 'phone',   FILTER_SANITIZE_SPECIAL_CHARS) ?? '');
$assunto  = trim(filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_SPECIAL_CHARS) ?? '');
$mensagem = trim(filter_input(INPUT_POST, 'message', FILTER_SANITIZE_SPECIAL_CHARS) ?? '');

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

$dataHora     = date('d/m/Y \às H:i');
$assuntoLabel = $assunto ?: 'Contacto geral';

$logoPath = __DIR__ . '/../assets/img/Logo_noslogan.png';
$logoTag  = file_exists($logoPath)
    ? '<img src="cid:pk_logo" alt="PlayKids" style="height:70px;width:auto;">'
    : '<span style="font-size:22px;font-weight:bold;color:#fff;font-family:Arial,sans-serif;">PlayKids</span>';

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = $smtpHost;
    $mail->SMTPAuth   = true;
    $mail->Username   = $smtpUser;
    $mail->Password   = $smtpPassword;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = $smtpPort;
    $mail->CharSet    = 'UTF-8';
    $mail->SMTPOptions = ['ssl' => [
        'verify_peer'       => false,
        'verify_peer_name'  => false,
        'allow_self_signed' => true,
    ]];

    $mail->setFrom($smtpUser, $mailNome);
    $mail->addAddress($mailPara, $mailNome);
    $mail->addReplyTo($email, $nome);
    $mail->XMailer = 'PlayKids Mailer';
    $mail->addCustomHeader('X-Priority', '3');
    $mail->addCustomHeader('X-Auto-Response-Suppress', 'OOF, DR, RN, NRN, AutoReply');

    if (file_exists($logoPath)) {
        $mail->addEmbeddedImage($logoPath, 'pk_logo', 'pk_logo.png', 'base64', 'image/png');
    }

    $mail->Subject = 'Novo contacto de ' . $nome . ' - PlayKids';
    $mail->isHTML(true);

    $mail->Body = '<!DOCTYPE html>
<html lang="pt"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:30px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.1);">
  <tr><td style="background:linear-gradient(135deg,#e91e8c,#c2185b);padding:28px 40px;text-align:center;">' . $logoTag . '</td></tr>
  <tr><td style="background:#fff8fd;padding:12px 40px;text-align:center;border-bottom:2px solid #f9c0e3;">
    <p style="margin:0;color:#c2185b;font-size:13px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">Novo Pedido de Contacto</p>
  </td></tr>
  <tr><td style="padding:28px 40px;">
    <p style="margin:0 0 20px;color:#555;font-size:14px;line-height:1.6;">Recebeu uma nova mensagem através do formulário de contacto.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      <tr><td style="padding:10px 0;border-bottom:1px solid #f0e0f5;">
        <span style="color:#999;font-size:11px;text-transform:uppercase;">Nome</span><br>
        <strong style="color:#2d0020;font-size:15px;">' . htmlspecialchars($nome) . '</strong>
      </td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #f0e0f5;">
        <span style="color:#999;font-size:11px;text-transform:uppercase;">E-mail</span><br>
        <a href="mailto:' . htmlspecialchars($email) . '" style="color:#e91e8c;font-size:14px;text-decoration:none;">' . htmlspecialchars($email) . '</a>
      </td></tr>'
      . ($telefone ? '<tr><td style="padding:10px 0;border-bottom:1px solid #f0e0f5;">
        <span style="color:#999;font-size:11px;text-transform:uppercase;">Telefone</span><br>
        <a href="https://wa.me/' . preg_replace('/\D/', '', $telefone) . '" style="color:#25D366;font-size:14px;font-weight:bold;text-decoration:none;">' . htmlspecialchars($telefone) . '</a>
      </td></tr>' : '')
      . ($assunto ? '<tr><td style="padding:10px 0;border-bottom:1px solid #f0e0f5;">
        <span style="color:#999;font-size:11px;text-transform:uppercase;">Assunto</span><br>
        <strong style="color:#2d0020;font-size:14px;">' . htmlspecialchars($assunto) . '</strong>
      </td></tr>' : '') . '
    </table>
    <p style="margin:0 0 6px;color:#999;font-size:11px;text-transform:uppercase;">Mensagem</p>
    <div style="background:#fff8fd;border-left:4px solid #e91e8c;padding:14px 18px;border-radius:6px;color:#333;font-size:14px;line-height:1.7;">' . nl2br(htmlspecialchars($mensagem)) . '</div>
  </td></tr>
  <tr><td style="background:#fdf0f8;padding:14px 40px;text-align:center;border-top:1px solid #f0e0f5;">
    <p style="margin:0;color:#aaa;font-size:12px;">Enviado em ' . $dataHora . ' | <a href="' . $siteUrl . '" style="color:#e91e8c;text-decoration:none;">playkidsrainha.pt</a></p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>';

    $mail->AltBody = "Novo contacto - PlayKids\r\n\r\nNome: {$nome}\r\nEmail: {$email}"
        . ($telefone ? "\r\nTelefone: {$telefone}" : '')
        . ($assunto  ? "\r\nAssunto: {$assunto}"   : '')
        . "\r\n\r\nMensagem:\r\n{$mensagem}";

    $mail->send();
    echo json_encode(['status' => 'success', 'message' => 'Mensagem enviada com sucesso!']);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status'  => 'error',
        'message' => 'Erro ao enviar a mensagem. Por favor tente novamente.',
        'debug'   => $mail->ErrorInfo,
    ]);
}
