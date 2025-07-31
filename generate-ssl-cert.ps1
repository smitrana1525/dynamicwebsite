# PowerShell script to generate SSL certificates for local development
# This script creates self-signed certificates for localhost

Write-Host "Generating SSL certificates for local development..." -ForegroundColor Green

# Create certificates directory if it doesn't exist
$certsDir = "certs"
if (!(Test-Path $certsDir)) {
    New-Item -ItemType Directory -Path $certsDir
}

# Generate root CA certificate
Write-Host "Generating root CA certificate..." -ForegroundColor Yellow
$rootCert = New-SelfSignedCertificate -Subject "CN=MoneyCare Root CA" -CertStoreLocation "Cert:\LocalMachine\My" -KeyUsageProperty Sign -KeyUsage CertSign -KeyAlgorithm RSA -KeyLength 2048 -NotAfter (Get-Date).AddYears(10)

# Export root CA certificate
$rootCertPath = "$certsDir\root-ca.cer"
Export-Certificate -Cert $rootCert -FilePath $rootCertPath

# Generate localhost certificate
Write-Host "Generating localhost certificate..." -ForegroundColor Yellow
$localhostCert = New-SelfSignedCertificate -Subject "CN=localhost" -DnsName "localhost" -CertStoreLocation "Cert:\LocalMachine\My" -Signer $rootCert -KeyAlgorithm RSA -KeyLength 2048 -NotAfter (Get-Date).AddYears(1)

# Export localhost certificate with private key
$localhostCertPath = "$certsDir\localhost.pfx"
$password = ConvertTo-SecureString -String "password" -Force -AsPlainText
Export-PfxCertificate -Cert $localhostCert -FilePath $localhostCertPath -Password $password

# Export localhost certificate without private key
$localhostCertPathCer = "$certsDir\localhost.cer"
Export-Certificate -Cert $localhostCert -FilePath $localhostCertPathCer

Write-Host "SSL certificates generated successfully!" -ForegroundColor Green
Write-Host "Root CA certificate: $rootCertPath" -ForegroundColor Cyan
Write-Host "Localhost certificate: $localhostCertPath" -ForegroundColor Cyan
Write-Host "Localhost certificate (public): $localhostCertPathCer" -ForegroundColor Cyan
Write-Host ""
Write-Host "To install the root CA certificate, run:" -ForegroundColor Yellow
Write-Host "certutil -addstore Root $rootCertPath" -ForegroundColor White
Write-Host ""
Write-Host "For React development server, you can use:" -ForegroundColor Yellow
Write-Host "set HTTPS=true && set SSL_CRT_FILE=$localhostCertPathCer && set SSL_KEY_FILE=$localhostCertPath && npm start" -ForegroundColor White 