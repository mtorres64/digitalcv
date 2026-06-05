# CV Portfolio - Script de inicio
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$backend = Join-Path $root "backend"
$frontend = Join-Path $root "frontend"

Write-Host "`n=== CV Portfolio ===" -ForegroundColor Cyan

# 1. MongoDB (servicio de Windows)
Write-Host "`n[1/3] MongoDB..." -ForegroundColor Yellow
$svc = Get-Service -Name "MongoDB" -ErrorAction SilentlyContinue
if ($svc) {
    if ($svc.Status -ne "Running") {
        Start-Service "MongoDB"
        Write-Host "     Servicio MongoDB iniciado." -ForegroundColor Green
    } else {
        Write-Host "     MongoDB ya estaba corriendo." -ForegroundColor Green
    }
} else {
    # Intentar levantar mongod directamente si no hay servicio registrado
    $mongod = Get-Command mongod -ErrorAction SilentlyContinue
    if ($mongod) {
        $dataPath = Join-Path $root "data\db"
        New-Item -ItemType Directory -Force -Path $dataPath | Out-Null
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "mongod --dbpath '$dataPath'"
        Write-Host "     mongod iniciado (dbpath: $dataPath)." -ForegroundColor Green
        Start-Sleep -Seconds 2
    } else {
        Write-Host "     ADVERTENCIA: MongoDB no encontrado. Instala MongoDB Community y vuelve a intentar." -ForegroundColor Red
        Write-Host "     https://www.mongodb.com/try/download/community" -ForegroundColor DarkGray
    }
}

# 2. Seed (solo la primera vez)
$seedFlag = Join-Path $root ".seeded"
if (-not (Test-Path $seedFlag)) {
    Write-Host "`n[2/3] Cargando datos iniciales..." -ForegroundColor Yellow
    Start-Sleep -Seconds 1
    Push-Location $backend
    node src/seed.js
    Pop-Location
    New-Item -ItemType File -Path $seedFlag | Out-Null
    Write-Host "     Datos cargados." -ForegroundColor Green
} else {
    Write-Host "`n[2/3] Base de datos ya seedeada, saltando." -ForegroundColor DarkGray
}

# 3. Backend y Frontend en nuevas ventanas
Write-Host "`n[3/3] Iniciando servicios..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backend'; Write-Host 'Backend - http://localhost:5000' -ForegroundColor Cyan; npm run dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontend'; Write-Host 'Frontend - http://localhost:5173' -ForegroundColor Cyan; npm run dev"

# 4. Abrir browser
Start-Sleep -Seconds 4
Start-Process "http://localhost:5173"

Write-Host "`n Listo!" -ForegroundColor Green
Write-Host " Frontend: http://localhost:5173" -ForegroundColor DarkGray
Write-Host " API:      http://localhost:5000/api/cv`n" -ForegroundColor DarkGray
