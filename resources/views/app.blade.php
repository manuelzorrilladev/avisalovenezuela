<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">


    <meta name="description" content="¿Tienes algo que vender? ¡Avísalo! ¿Buscas algo nuevo? ¡Encuéntralo!" />
    <link rel="canonical" href="https://avisalovenezuela.com/" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://avisalovenezuela.com/" />
    <meta property="og:title" content="Avísalo Venezuela" />
    <meta property="og:description" content="¿Tienes algo que vender? ¡Avísalo! ¿Buscas algo nuevo? ¡Encuéntralo!" />
    <meta property="og:image" content="https://avisalovenezuela.com/assets/img/avisalo.png" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="https://avisalovenezuela.com/" />
    <meta name="twitter:title" content="Avísalo Venezuela" />
    <meta name="twitter:description" content="¿Tienes algo que vender? ¡Avísalo! ¿Buscas algo nuevo? ¡Encuéntralo!" />
    <meta name="twitter:image" content="https://avisalovenezuela.com/assets/img/avisalo.png" />

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function () {
            const appearance = '{{ $appearance ?? "system" }}';

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
        <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    </script>

    {{-- Inline style to set the HTML background color based on our theme in app.css --}}
    <style>
        html {
            background-color: oklch(1 0 0);
        }

        html.dark {
            background-color: oklch(0.8226 0.1644 85.27);
        }
    </style>

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <link rel="icon" href="/favicon.png" sizes="any">
    <link rel="apple-touch-icon" href="/favicon.png">

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    @vite(['resources/js/app.ts', "resources/js/pages/{$page['component']}.vue"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>