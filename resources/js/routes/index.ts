import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../wayfinder'
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
})

    /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
    const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: login.url(options),
        method: 'get',
    })

            /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
        loginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url(options),
            method: 'get',
        })
            /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
        loginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    login.form = loginForm
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

    /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
    const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: logout.url(options),
        method: 'post',
    })

            /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
        logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: logout.url(options),
            method: 'post',
        })
    
    logout.form = logoutForm
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
export const register = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})

register.definition = {
    methods: ["get","head"],
    url: '/register',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
register.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
register.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: register.url(options),
    method: 'head',
})

    /**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
    const registerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: register.url(options),
        method: 'get',
    })

            /**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
        registerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: register.url(options),
            method: 'get',
        })
            /**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
        registerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: register.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    register.form = registerForm
/**
* @see \App\Http\Controllers\PublicationController::home
 * @see app/Http/Controllers/PublicationController.php:25
 * @route '/'
 */
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicationController::home
 * @see app/Http/Controllers/PublicationController.php:25
 * @route '/'
 */
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::home
 * @see app/Http/Controllers/PublicationController.php:25
 * @route '/'
 */
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicationController::home
 * @see app/Http/Controllers/PublicationController.php:25
 * @route '/'
 */
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicationController::home
 * @see app/Http/Controllers/PublicationController.php:25
 * @route '/'
 */
    const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: home.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicationController::home
 * @see app/Http/Controllers/PublicationController.php:25
 * @route '/'
 */
        homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicationController::home
 * @see app/Http/Controllers/PublicationController.php:25
 * @route '/'
 */
        homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    home.form = homeForm
/**
* @see \App\Http\Controllers\PublicationController::searchCategory
 * @see app/Http/Controllers/PublicationController.php:76
 * @route '/anuncios/{category_slug?}/{sub_category_slug?}'
 */
export const searchCategory = (args?: { category_slug?: string | number, sub_category_slug?: string | number } | [category_slug: string | number, sub_category_slug: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchCategory.url(args, options),
    method: 'get',
})

searchCategory.definition = {
    methods: ["get","head"],
    url: '/anuncios/{category_slug?}/{sub_category_slug?}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicationController::searchCategory
 * @see app/Http/Controllers/PublicationController.php:76
 * @route '/anuncios/{category_slug?}/{sub_category_slug?}'
 */
searchCategory.url = (args?: { category_slug?: string | number, sub_category_slug?: string | number } | [category_slug: string | number, sub_category_slug: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    category_slug: args[0],
                    sub_category_slug: args[1],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "category_slug",
            "sub_category_slug",
        ])

    const parsedArgs = {
                        category_slug: args?.category_slug,
                                sub_category_slug: args?.sub_category_slug,
                }

    return searchCategory.definition.url
            .replace('{category_slug?}', parsedArgs.category_slug?.toString() ?? '')
            .replace('{sub_category_slug?}', parsedArgs.sub_category_slug?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::searchCategory
 * @see app/Http/Controllers/PublicationController.php:76
 * @route '/anuncios/{category_slug?}/{sub_category_slug?}'
 */
searchCategory.get = (args?: { category_slug?: string | number, sub_category_slug?: string | number } | [category_slug: string | number, sub_category_slug: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchCategory.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicationController::searchCategory
 * @see app/Http/Controllers/PublicationController.php:76
 * @route '/anuncios/{category_slug?}/{sub_category_slug?}'
 */
searchCategory.head = (args?: { category_slug?: string | number, sub_category_slug?: string | number } | [category_slug: string | number, sub_category_slug: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: searchCategory.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicationController::searchCategory
 * @see app/Http/Controllers/PublicationController.php:76
 * @route '/anuncios/{category_slug?}/{sub_category_slug?}'
 */
    const searchCategoryForm = (args?: { category_slug?: string | number, sub_category_slug?: string | number } | [category_slug: string | number, sub_category_slug: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: searchCategory.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicationController::searchCategory
 * @see app/Http/Controllers/PublicationController.php:76
 * @route '/anuncios/{category_slug?}/{sub_category_slug?}'
 */
        searchCategoryForm.get = (args?: { category_slug?: string | number, sub_category_slug?: string | number } | [category_slug: string | number, sub_category_slug: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: searchCategory.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicationController::searchCategory
 * @see app/Http/Controllers/PublicationController.php:76
 * @route '/anuncios/{category_slug?}/{sub_category_slug?}'
 */
        searchCategoryForm.head = (args?: { category_slug?: string | number, sub_category_slug?: string | number } | [category_slug: string | number, sub_category_slug: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: searchCategory.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    searchCategory.form = searchCategoryForm
/**
* @see \App\Http\Controllers\PublicationController::viewDescription
 * @see app/Http/Controllers/PublicationController.php:124
 * @route '/anuncio/{publication}'
 */
export const viewDescription = (args: { publication: string | { slug: string } } | [publication: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: viewDescription.url(args, options),
    method: 'get',
})

viewDescription.definition = {
    methods: ["get","head"],
    url: '/anuncio/{publication}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicationController::viewDescription
 * @see app/Http/Controllers/PublicationController.php:124
 * @route '/anuncio/{publication}'
 */
viewDescription.url = (args: { publication: string | { slug: string } } | [publication: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { publication: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { publication: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    publication: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        publication: typeof args.publication === 'object'
                ? args.publication.slug
                : args.publication,
                }

    return viewDescription.definition.url
            .replace('{publication}', parsedArgs.publication.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::viewDescription
 * @see app/Http/Controllers/PublicationController.php:124
 * @route '/anuncio/{publication}'
 */
viewDescription.get = (args: { publication: string | { slug: string } } | [publication: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: viewDescription.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicationController::viewDescription
 * @see app/Http/Controllers/PublicationController.php:124
 * @route '/anuncio/{publication}'
 */
viewDescription.head = (args: { publication: string | { slug: string } } | [publication: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: viewDescription.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicationController::viewDescription
 * @see app/Http/Controllers/PublicationController.php:124
 * @route '/anuncio/{publication}'
 */
    const viewDescriptionForm = (args: { publication: string | { slug: string } } | [publication: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: viewDescription.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicationController::viewDescription
 * @see app/Http/Controllers/PublicationController.php:124
 * @route '/anuncio/{publication}'
 */
        viewDescriptionForm.get = (args: { publication: string | { slug: string } } | [publication: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: viewDescription.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicationController::viewDescription
 * @see app/Http/Controllers/PublicationController.php:124
 * @route '/anuncio/{publication}'
 */
        viewDescriptionForm.head = (args: { publication: string | { slug: string } } | [publication: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: viewDescription.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    viewDescription.form = viewDescriptionForm
/**
* @see \App\Http\Controllers\UserController::dashboard
 * @see app/Http/Controllers/UserController.php:19
 * @route '/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserController::dashboard
 * @see app/Http/Controllers/UserController.php:19
 * @route '/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::dashboard
 * @see app/Http/Controllers/UserController.php:19
 * @route '/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UserController::dashboard
 * @see app/Http/Controllers/UserController.php:19
 * @route '/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\UserController::dashboard
 * @see app/Http/Controllers/UserController.php:19
 * @route '/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\UserController::dashboard
 * @see app/Http/Controllers/UserController.php:19
 * @route '/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\UserController::dashboard
 * @see app/Http/Controllers/UserController.php:19
 * @route '/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm