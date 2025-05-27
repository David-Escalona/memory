# 🧠 API RESTful - Memory Game (Laravel 11 + JWT)

## 🎯 Objectiu del projecte

Aquesta API RESTful s’ha desenvolupat amb Laravel 11 per gestionar un **joc de Memory** en què els usuaris poden registrar-se, iniciar sessió, jugar partides i competir per puntuacions en un rànquing. L'API està pensada per ser consumida per un frontend fet amb JavaScript i `fetch()`.

---

## 🔐 Autenticació amb JWT

- Registre (`POST /api/register`) amb validació i rol (`admin` o `user`)
- Login (`POST /api/login`) retorna token JWT
- Logout (`POST /api/logout`) invalida el token
- Obtenir perfil (`GET /api/me`) retorna dades de l’usuari autenticat

---

## 🔧 Protecció de rutes

- `IsUserAuth`: middleware que permet accés només si l'usuari està autenticat
- `IsAdmin`: només accessible si el `role` de l’usuari és `admin`

---

## 🎮 Gestió de partides

### Models i taules relacionades

**Taula `games`:**
- `user_id` (clau forana)
- `clicks` (int)
- `points` (int)
- `duration` (int, segons)
- `timestamps`

**Model `Game.php`**
- Relació belongsTo cap a `User.php`

### Controlador `GameController`

- `index()` → retorna les partides de l’usuari loguejat
- `store()` → crea una nova partida buida
- `update()` → finalitza una partida (clicks, points, duration)
- `destroy()` → elimina una partida si ets propietari o admin
- `ranking()` → consulta amb `groupBy`, `MIN`, `MAX` i `with('user')` per mostrar TOP 5 jugadors
- `getGamesByUserId($id)` → mostra totes les partides d’un usuari concret (només per admins)

---

## 🔁 Rutes protegides

### Usuari autenticat (token JWT)

- GET `/games`
- POST `/games`
- PUT `/games/{id}/finish`
- GET `/ranking`
- POST `/logout`
- GET `/me`

### Admin

- GET `/users`
- GET `/users/{id}`
- PUT `/users/{id}`
- DELETE `/users/{id}`
- GET `/users/{id}/games`

---

## 🧪 Seeders i proves

Inclou seeders per a:

- Usuaris (`UserSeeder`) amb 1 admin i 3 usuaris normals
- Partides (`GameSeeder`) amb exemples per provar el rànquing
- Personatges (`PersonajeSeeder`) amb URL d’imatges i timestamps

Per executar:

- `php artisan migrate:fresh --seed`

---

## 🧪 Proves amb Postman

Inclosa una col·lecció `.json` amb:

- Registre i login
- Crear i finalitzar partida
- Consultar rànquing
- Operacions d’administrador

---

## 📌 Notes finals

- Es recomana usar `Hash::make()` per generar contrasenyes
- La durada de partida s’envia des del frontend com `duration` (segons)
- La validació `email` a `updateUser` fa servir `sometimes` i controla duplicats amb `unique:users,email,{id}`

---

## 🌐 Documentació d'Endpoints per a Frontend

Documentació pensada per a desenvolupadors frontend que necessitin consumir l’API.

### 🔐 Autenticació

**POST /api/register**

Crea un nou usuari.  
Body JSON:
"name": "Anna",  
"email": "anna@example.com",  
"password": "12345678",  
"password_confirmation": "12345678",  
"role": "user"

**POST /api/login**

Inicia sessió i retorna un token.  
Body JSON:
"email": "anna@example.com",  
"password": "12345678"

**GET /api/me**  
Retorna l'usuari autenticat (Bearer Token requerit)

**POST /api/logout**  
Invalida el token actual

---

### 🎮 Partides (`games`)

**Model Game:**
- `id`: integer
- `user_id`: integer
- `clicks`: integer
- `points`: integer
- `duration`: integer (en segons)

**GET /api/games**  
Llista les partides de l’usuari actual

**POST /api/games**  
Crea una partida buida (no cal body)

**PUT /api/games/{id}/finish**  
Finalitza una partida  
Body JSON:
"clicks": 24,  
"points": 10,  
"duration": 52

**GET /api/ranking**  
Retorna el rànquing dels millors 5 jugadors

---

### 👤 Gestió d’usuaris (Admin)

**Model User:**
- `id`: integer
- `name`: string
- `email`: string
- `password`: string
- `role`: string ('admin' o 'user')

**GET /api/users**  
Llista tots els usuaris

**GET /api/users/{id}**  
Retorna un usuari concret

**PUT /api/users/{id}**  
Actualitza dades d’un usuari  
Body JSON opcional:
"name": "Anna Nova",  
"email": "anna.nova@example.com",  
"role": "admin",  
"password": "nova12345",  
"password_confirmation": "nova12345"

**DELETE /api/users/{id}**  
Elimina un usuari

**GET /api/users/{id}/games**  
Llista totes les partides d’un usuari

---

### 🛡️ Autenticació requerida

Tots els endpoints protegits requereixen token JWT:

Header:
Authorization: Bearer {token}

### 🧙‍♂️ Gestió de personatges (`personajes`)

**Model Personaje:**
- `id`: integer
- `nombre`: string
- `url_imagen`: string

**GET /api/personajes**  
Llista tots els personatges disponibles. Accessible públicament (no cal token).

**GET /api/personajes/{id}**  
Mostra un personatge concret pel seu ID.

**POST /api/personajes**  
Crea un nou personatge. Accessible amb token (usuaris autenticats).  
Body JSON:
"nombre": "Mario",  
"url_imagen": "https://exemple.com/mario.png"

**PUT /api/personajes/{id}**  
Actualitza un personatge existent. Accessible només per administradors.  
Body JSON:
"nombre": "Mario Actualitzat",  
"url_imagen": "https://exemple.com/mario_new.png"

**DELETE /api/personajes/{id}**  
Elimina un personatge per ID. Només per admins.

---

### RESUM ENDPOINTS

```
//PUBLIC ROUTES
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::get('personajes', [PersonajesController::class, 'getPersonajes']);
Route::get('/personajes/{id}', [PersonajesController::class, 'getPersonaje']);


//PROTECTED ROUTES IS USER AUTH (LOGIN W TOKEN)
Route::middleware([IsUserAuth::class])->group(function () {
    // 🔑 Autenticació
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'getUser']);

    // 🎭 Personatges (afegeix però no modifica ni elimina)
    Route::post('personajes', [PersonajesController::class, 'addPersonaje']);

    // 🧠 Partides
    Route::get('/games', [GameController::class, 'index']);              // Veure les meves partides
    Route::post('/games', [GameController::class, 'store']);             // Crear partida
    Route::put('/games/{game}/finish', [GameController::class, 'update']); // Finalitzar
    Route::get('/ranking', [GameController::class, 'ranking']);          // TOP 5
});


//ADMIN ROUTES
Route::middleware([IsAdmin::class])->group(function () {
    // 👥 Gestió d'usuaris
    Route::get('users', [AuthController::class, 'getUsers']);
    Route::get('/users/{id}', [AuthController::class, 'getUserById']);
    Route::put('/users/{id}', [AuthController::class, 'updateUser']);
    Route::delete('/users/{id}', [AuthController::class, 'deleteUser']);

    // 🎭 CRUD complet de personatges
    Route::post('personajes', [PersonajesController::class, 'addPersonaje']);
    Route::put('/personajes/{id}', [PersonajesController::class, 'updatePersonaje']);
    Route::delete('/personajes/{id}', [PersonajesController::class, 'deletePersonaje']);

    // 🧠 CRUD complet de partides
    Route::get('/games', [GameController::class, 'index']);              // Veure totes les partides
    Route::delete('/games/{game}', [GameController::class, 'destroy']);  // Eliminar partida
    Route::get('/users/{id}/games', [GameController::class, 'getGamesByUserId']);
});
```
