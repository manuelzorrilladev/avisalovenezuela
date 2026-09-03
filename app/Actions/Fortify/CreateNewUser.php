<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    public function create(array $input): User
    {
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique(User::class)],
            'id_card' => ['required', 'string', 'max:255', Rule::unique(User::class, 'id_card')],
            'password' => $this->passwordRules(),
           'phone'   => [
                'required',
                'string',
                'regex:/^(0412|0414|0424|0416|0426)[0-9]{7}$/',
                Rule::unique(User::class, 'phone'),
            ],
        ];

        $messages = [
            'name.required' => 'Por favor, ingresa tu nombre completo.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'Debes ingresar una dirección de correo válida.',
            'email.unique' => 'Este correo electrónico ya está registrado en nuestra plataforma.',
            'id_card.required' => 'Debes ingresar tu documento de identidad.',
            'id_card.unique' => 'Este número de cédula/documento ya pertenece a un usuario registrado.',
            'password.required' => 'La contraseña es requerida.',
            'password.min' => 'La contraseña debe tener al menos :min caracteres.',
            'password.confirmed' => 'Las contraseñas no coinciden.',
            'phone.required'    => 'El número de teléfono es obligatorio.',
            'phone.regex'       => 'Ingresa un número de teléfono válido (ej: 04141234567).',
            'phone.unique'      => 'Este número de teléfono ya está registrado con otra cuenta.'
        ];

        Validator::make($input, $rules, $messages)->validate();

        return User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'id_card' => $input['id_card'],
            'password' => $input['password'],
            'phone' => $input['phone'],
        ]);
    }
}