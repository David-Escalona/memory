<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>suma</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
</head>
<body>
    <div class="container flex gap-5 p-5 rounded " >
        <h1>Suma de dos números</h1>
        <form action="/suma" method="POST">
            @csrf
            <input type="number" name="num1" placeholder="Número 1">
            <input type="number" name="num2" placeholder="Número 2">
            <button type="submit">Sumar</button>
        </form>


        @if (isset($resultado))
            <h2>Resultado: {{$resultado}}</h2>
        @endif
    </div>
</body>
</html>
