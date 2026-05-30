<?php
// PlayKids – Pedido de Orcamento via email
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

$nome     = trim(filter_input(INPUT_POST, 'nome',     FILTER_SANITIZE_SPECIAL_CHARS) ?? '');
$telefone = trim(filter_input(INPUT_POST, 'telefone', FILTER_SANITIZE_SPECIAL_CHARS) ?? '');
$email    = trim(filter_input(INPUT_POST, 'email',    FILTER_SANITIZE_EMAIL)         ?? '');
$servicos = trim(filter_input(INPUT_POST, 'servicos', FILTER_SANITIZE_SPECIAL_CHARS) ?? '');
$detalhes = trim(filter_input(INPUT_POST, 'detalhes', FILTER_UNSAFE_RAW)             ?? '');
$detalhes = strip_tags($detalhes);
$obs      = trim(filter_input(INPUT_POST, 'obs',      FILTER_SANITIZE_SPECIAL_CHARS) ?? '');

if (empty($nome) || empty($telefone)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Dados incompletos.']);
    exit;
}

$dataHora = date('d/m/Y H:i');

$logoPath = __DIR__ . '/../assets/img/Logo_noslogan.png';
$logoTag  = file_exists($logoPath)
    ? '<img src="cid:pk_logo" alt="PlayKids" style="height:60px;width:auto;">'
    : '<span style="font-size:20px;font-weight:bold;color:#fff;font-family:Arial,sans-serif;">PlayKids</span>';

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
    $mail->addReplyTo(
        (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) ? $email : $smtpUser,
        $nome
    );
    $mail->XMailer = 'PlayKids Mailer';
    $mail->addCustomHeader('X-Priority', '3');

    if (file_exists($logoPath)) {
        $mail->addEmbeddedImage($logoPath, 'pk_logo', 'pk_logo.png', 'base64', 'image/png');
    }

    $mail->Subject = 'Pedido de Orcamento de ' . $nome . ' - PlayKids';
    $mail->isHTML(true);

    $rows = '';
    $items = [
        'Nome'              => htmlspecialchars($nome),
        'Telefone/WhatsApp' => '<a href="https://wa.me/' . preg_replace('/\D/', '', $telefone) . '" style="color:#25D366;text-decoration:none;font-weight:bold;">' . htmlspecialchars($telefone) . '</a>',
    ];
    if (!empty($email))    $items['E-mail']     = '<a href="mailto:' . htmlspecialchars($email) . '" style="color:#c2185b;text-decoration:none;">' . htmlspecialchars($email) . '</a>';
    if (!empty($servicos)) $items['Servicos']    = htmlspecialchars($servicos);
    if (!empty($detalhes)) $items['Detalhes']    = '<span style="font-size:13px;line-height:1.8;color:#333;">' . nl2br(htmlspecialchars($detalhes)) . '</span>';
    if (!empty($obs))      $items['Observacoes'] = nl2br(htmlspecialchars($obs));

    foreach ($items as $label => $value) {
        $rows .= '<tr><td style="padding:10px 0;border-bottom:1px solid #f0e0f5;vertical-align:top;">
            <span style="color:#999;font-size:11px;text-transform:uppercase;letter-spacing:.5px;">' . $label . '</span><br>
            <span style="color:#2d0020;font-size:14px;">' . $value . '</span>
          </td></tr>';
    }

    $mail->Body = '<!DOCTYPE html>
<html lang="pt"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:30px 0;">
<tr><td align="center">
<table width="580" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08);">
  <tr><td style="background:#c2185b;padding:24px 36px;text-align:center;">' . $logoTag . '</td></tr>
  <tr><td style="background:#fdf2f8;padding:12px 36px;text-align:center;border-bottom:1px solid #f0c8e0;">
    <p style="margin:0;color:#c2185b;font-size:13px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">Novo Pedido de Orcamento</p>
  </td></tr>
  <tr><td style="padding:28px 36px;">
    <p style="margin:0 0 20px;color:#555;font-size:14px;">Recebeu um novo pedido de orcamento atraves do website PlayKids.</p>
    <table width="100%" cellpadding="0" cellspacing="0">' . $rows . '</table>
  </td></tr>
  <tr><td style="background:#fdf2f8;padding:14px 36px;text-align:center;border-top:1px solid #f0c8e0;">
    <p style="margin:0;color:#aaa;font-size:12px;">Recebido em ' . $dataHora . ' | <a href="' . $siteUrl . '" style="color:#c2185b;text-decoration:none;">playkidsrainha.pt</a></p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>';

    $mail->AltBody = "Novo Pedido de Orcamento - PlayKids\r\n\r\n"
        . "Nome: {$nome}\r\nTelefone: {$telefone}"
        . (!empty($email)    ? "\r\nEmail: {$email}"       : '')
        . (!empty($servicos) ? "\r\nServicos: {$servicos}" : '')
        . (!empty($detalhes) ? "\r\n\r\n{$detalhes}"       : '')
        . (!empty($obs)      ? "\r\nObs: {$obs}"           : '')
        . "\r\n\r\nRecebido em {$dataHora}";

    $mail->send();
    echo json_encode(['status' => 'success']);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status'  => 'error',
        'message' => 'Erro ao enviar. Tente novamente.',
        'debug'   => $mail->ErrorInfo,
    ]);
}
