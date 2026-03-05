import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:17
 * @route '/api/publications/get-all'
 */
const getAll63fc330aa7a7b360f25c8b6260e8943b = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAll63fc330aa7a7b360f25c8b6260e8943b.url(options),
    method: 'get',
})

getAll63fc330aa7a7b360f25c8b6260e8943b.definition = {
    methods: ["get","head"],
    url: '/api/publications/get-all',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:17
 * @route '/api/publications/get-all'
 */
getAll63fc330aa7a7b360f25c8b6260e8943b.url = (options?: RouteQueryOptions) => {
    return getAll63fc330aa7a7b360f25c8b6260e8943b.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:17
 * @route '/api/publications/get-all'
 */
getAll63fc330aa7a7b360f25c8b6260e8943b.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAll63fc330aa7a7b360f25c8b6260e8943b.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:17
 * @route '/api/publications/get-all'
 */
getAll63fc330aa7a7b360f25c8b6260e8943b.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getAll63fc330aa7a7b360f25c8b6260e8943b.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:17
 * @route '/api/publications/get-all'
 */
    const getAll63fc330aa7a7b360f25c8b6260e8943bForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getAll63fc330aa7a7b360f25c8b6260e8943b.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:17
 * @route '/api/publications/get-all'
 */
        getAll63fc330aa7a7b360f25c8b6260e8943bForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getAll63fc330aa7a7b360f25c8b6260e8943b.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:17
 * @route '/api/publications/get-all'
 */
        getAll63fc330aa7a7b360f25c8b6260e8943bForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getAll63fc330aa7a7b360f25c8b6260e8943b.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getAll63fc330aa7a7b360f25c8b6260e8943b.form = getAll63fc330aa7a7b360f25c8b6260e8943bForm
    /**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:17
 * @route '/'
 */
const getAll980bb49ee7ae63891f1d891d2fbcf1c9 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAll980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
    method: 'get',
})

getAll980bb49ee7ae63891f1d891d2fbcf1c9.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:17
 * @route '/'
 */
getAll980bb49ee7ae63891f1d891d2fbcf1c9.url = (options?: RouteQueryOptions) => {
    return getAll980bb49ee7ae63891f1d891d2fbcf1c9.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:17
 * @route '/'
 */
getAll980bb49ee7ae63891f1d891d2fbcf1c9.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAll980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:17
 * @route '/'
 */
getAll980bb49ee7ae63891f1d891d2fbcf1c9.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getAll980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:17
 * @route '/'
 */
    const getAll980bb49ee7ae63891f1d891d2fbcf1c9Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getAll980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:17
 * @route '/'
 */
        getAll980bb49ee7ae63891f1d891d2fbcf1c9Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getAll980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:17
 * @route '/'
 */
        getAll980bb49ee7ae63891f1d891d2fbcf1c9Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getAll980bb49ee7ae63891f1d891d2fbcf1c9.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getAll980bb49ee7ae63891f1d891d2fbcf1c9.form = getAll980bb49ee7ae63891f1d891d2fbcf1c9Form

export const getAll = {
    '/api/publications/get-all': getAll63fc330aa7a7b360f25c8b6260e8943b,
    '/': getAll980bb49ee7ae63891f1d891d2fbcf1c9,
}

/**
* @see \App\Http\Controllers\PublicationController::getByCategory
 * @see app/Http/Controllers/PublicationController.php:66
 * @route '/anuncios/{category_slug}/{sub_category_slug?}'
 */
export const getByCategory = (args: { category_slug: string | number, sub_category_slug?: string | number } | [category_slug: string | number, sub_category_slug: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getByCategory.url(args, options),
    method: 'get',
})

getByCategory.definition = {
    methods: ["get","head"],
    url: '/anuncios/{category_slug}/{sub_category_slug?}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicationController::getByCategory
 * @see app/Http/Controllers/PublicationController.php:66
 * @route '/anuncios/{category_slug}/{sub_category_slug?}'
 */
getByCategory.url = (args: { category_slug: string | number, sub_category_slug?: string | number } | [category_slug: string | number, sub_category_slug: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    category_slug: args[0],
                    sub_category_slug: args[1],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "sub_category_slug",
        ])

    const parsedArgs = {
                        category_slug: args.category_slug,
                                sub_category_slug: args.sub_category_slug,
                }

    return getByCategory.definition.url
            .replace('{category_slug}', parsedArgs.category_slug.toString())
            .replace('{sub_category_slug?}', parsedArgs.sub_category_slug?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::getByCategory
 * @see app/Http/Controllers/PublicationController.php:66
 * @route '/anuncios/{category_slug}/{sub_category_slug?}'
 */
getByCategory.get = (args: { category_slug: string | number, sub_category_slug?: string | number } | [category_slug: string | number, sub_category_slug: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getByCategory.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicationController::getByCategory
 * @see app/Http/Controllers/PublicationController.php:66
 * @route '/anuncios/{category_slug}/{sub_category_slug?}'
 */
getByCategory.head = (args: { category_slug: string | number, sub_category_slug?: string | number } | [category_slug: string | number, sub_category_slug: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getByCategory.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicationController::getByCategory
 * @see app/Http/Controllers/PublicationController.php:66
 * @route '/anuncios/{category_slug}/{sub_category_slug?}'
 */
    const getByCategoryForm = (args: { category_slug: string | number, sub_category_slug?: string | number } | [category_slug: string | number, sub_category_slug: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getByCategory.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicationController::getByCategory
 * @see app/Http/Controllers/PublicationController.php:66
 * @route '/anuncios/{category_slug}/{sub_category_slug?}'
 */
        getByCategoryForm.get = (args: { category_slug: string | number, sub_category_slug?: string | number } | [category_slug: string | number, sub_category_slug: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getByCategory.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicationController::getByCategory
 * @see app/Http/Controllers/PublicationController.php:66
 * @route '/anuncios/{category_slug}/{sub_category_slug?}'
 */
        getByCategoryForm.head = (args: { category_slug: string | number, sub_category_slug?: string | number } | [category_slug: string | number, sub_category_slug: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
 * @see app/Http/Controllers/PublicationController.php:110
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
 * @see app/Http/Controllers/PublicationController.php:110
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
 * @see app/Http/Controllers/PublicationController.php:110
 * @route '/anuncio/{publication}'
 */
getDescription.get = (args: { publication: string | { slug: string } } | [publication: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDescription.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicationController::getDescription
 * @see app/Http/Controllers/PublicationController.php:110
 * @route '/anuncio/{publication}'
 */
getDescription.head = (args: { publication: string | { slug: string } } | [publication: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDescription.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicationController::getDescription
 * @see app/Http/Controllers/PublicationController.php:110
 * @route '/anuncio/{publication}'
 */
    const getDescriptionForm = (args: { publication: string | { slug: string } } | [publication: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getDescription.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicationController::getDescription
 * @see app/Http/Controllers/PublicationController.php:110
 * @route '/anuncio/{publication}'
 */
        getDescriptionForm.get = (args: { publication: string | { slug: string } } | [publication: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getDescription.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicationController::getDescription
 * @see app/Http/Controllers/PublicationController.php:110
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
const PublicationController = { getAll, getByCategory, getDescription }

export default PublicationController