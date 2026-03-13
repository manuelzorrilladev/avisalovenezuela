import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:0
 * @route '/api/publications/get-all'
 */
export const getAll = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAll.url(options),
    method: 'get',
})

getAll.definition = {
    methods: ["get","head"],
    url: '/api/publications/get-all',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:0
 * @route '/api/publications/get-all'
 */
getAll.url = (options?: RouteQueryOptions) => {
    return getAll.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:0
 * @route '/api/publications/get-all'
 */
getAll.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAll.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:0
 * @route '/api/publications/get-all'
 */
getAll.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getAll.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:0
 * @route '/api/publications/get-all'
 */
    const getAllForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getAll.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:0
 * @route '/api/publications/get-all'
 */
        getAllForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getAll.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:0
 * @route '/api/publications/get-all'
 */
        getAllForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getAll.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getAll.form = getAllForm
/**
* @see \App\Http\Controllers\PublicationController::getHome
 * @see app/Http/Controllers/PublicationController.php:17
 * @route '/'
 */
export const getHome = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getHome.url(options),
    method: 'get',
})

getHome.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicationController::getHome
 * @see app/Http/Controllers/PublicationController.php:17
 * @route '/'
 */
getHome.url = (options?: RouteQueryOptions) => {
    return getHome.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::getHome
 * @see app/Http/Controllers/PublicationController.php:17
 * @route '/'
 */
getHome.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getHome.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicationController::getHome
 * @see app/Http/Controllers/PublicationController.php:17
 * @route '/'
 */
getHome.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getHome.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicationController::getHome
 * @see app/Http/Controllers/PublicationController.php:17
 * @route '/'
 */
    const getHomeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getHome.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicationController::getHome
 * @see app/Http/Controllers/PublicationController.php:17
 * @route '/'
 */
        getHomeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getHome.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicationController::getHome
 * @see app/Http/Controllers/PublicationController.php:17
 * @route '/'
 */
        getHomeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getHome.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getHome.form = getHomeForm
/**
* @see \App\Http\Controllers\PublicationController::getByCategory
 * @see app/Http/Controllers/PublicationController.php:70
 * @route '/anuncios/{category_slug?}/{sub_category_slug?}'
 */
export const getByCategory = (args?: { category_slug?: string | number, sub_category_slug?: string | number } | [category_slug: string | number, sub_category_slug: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getByCategory.url(args, options),
    method: 'get',
})

getByCategory.definition = {
    methods: ["get","head"],
    url: '/anuncios/{category_slug?}/{sub_category_slug?}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicationController::getByCategory
 * @see app/Http/Controllers/PublicationController.php:70
 * @route '/anuncios/{category_slug?}/{sub_category_slug?}'
 */
getByCategory.url = (args?: { category_slug?: string | number, sub_category_slug?: string | number } | [category_slug: string | number, sub_category_slug: string | number ], options?: RouteQueryOptions) => {
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

    return getByCategory.definition.url
            .replace('{category_slug?}', parsedArgs.category_slug?.toString() ?? '')
            .replace('{sub_category_slug?}', parsedArgs.sub_category_slug?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::getByCategory
 * @see app/Http/Controllers/PublicationController.php:70
 * @route '/anuncios/{category_slug?}/{sub_category_slug?}'
 */
getByCategory.get = (args?: { category_slug?: string | number, sub_category_slug?: string | number } | [category_slug: string | number, sub_category_slug: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getByCategory.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicationController::getByCategory
 * @see app/Http/Controllers/PublicationController.php:70
 * @route '/anuncios/{category_slug?}/{sub_category_slug?}'
 */
getByCategory.head = (args?: { category_slug?: string | number, sub_category_slug?: string | number } | [category_slug: string | number, sub_category_slug: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getByCategory.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicationController::getByCategory
 * @see app/Http/Controllers/PublicationController.php:70
 * @route '/anuncios/{category_slug?}/{sub_category_slug?}'
 */
    const getByCategoryForm = (args?: { category_slug?: string | number, sub_category_slug?: string | number } | [category_slug: string | number, sub_category_slug: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getByCategory.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicationController::getByCategory
 * @see app/Http/Controllers/PublicationController.php:70
 * @route '/anuncios/{category_slug?}/{sub_category_slug?}'
 */
        getByCategoryForm.get = (args?: { category_slug?: string | number, sub_category_slug?: string | number } | [category_slug: string | number, sub_category_slug: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getByCategory.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicationController::getByCategory
 * @see app/Http/Controllers/PublicationController.php:70
 * @route '/anuncios/{category_slug?}/{sub_category_slug?}'
 */
        getByCategoryForm.head = (args?: { category_slug?: string | number, sub_category_slug?: string | number } | [category_slug: string | number, sub_category_slug: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getByCategory.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getByCategory.form = getByCategoryForm
/**
* @see \App\Http\Controllers\PublicationController::getDescription
 * @see app/Http/Controllers/PublicationController.php:118
 * @route '/anuncio/{publication}'
 */
export const getDescription = (args: { publication: string | { slug: string } } | [publication: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDescription.url(args, options),
    method: 'get',
})

getDescription.definition = {
    methods: ["get","head"],
    url: '/anuncio/{publication}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicationController::getDescription
 * @see app/Http/Controllers/PublicationController.php:118
 * @route '/anuncio/{publication}'
 */
getDescription.url = (args: { publication: string | { slug: string } } | [publication: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return getDescription.definition.url
            .replace('{publication}', parsedArgs.publication.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::getDescription
 * @see app/Http/Controllers/PublicationController.php:118
 * @route '/anuncio/{publication}'
 */
getDescription.get = (args: { publication: string | { slug: string } } | [publication: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDescription.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicationController::getDescription
 * @see app/Http/Controllers/PublicationController.php:118
 * @route '/anuncio/{publication}'
 */
getDescription.head = (args: { publication: string | { slug: string } } | [publication: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDescription.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicationController::getDescription
 * @see app/Http/Controllers/PublicationController.php:118
 * @route '/anuncio/{publication}'
 */
    const getDescriptionForm = (args: { publication: string | { slug: string } } | [publication: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getDescription.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicationController::getDescription
 * @see app/Http/Controllers/PublicationController.php:118
 * @route '/anuncio/{publication}'
 */
        getDescriptionForm.get = (args: { publication: string | { slug: string } } | [publication: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getDescription.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicationController::getDescription
 * @see app/Http/Controllers/PublicationController.php:118
 * @route '/anuncio/{publication}'
 */
        getDescriptionForm.head = (args: { publication: string | { slug: string } } | [publication: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getDescription.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getDescription.form = getDescriptionForm
const PublicationController = { getAll, getHome, getByCategory, getDescription }

export default PublicationController