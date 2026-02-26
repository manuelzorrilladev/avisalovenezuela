import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:15
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
 * @see app/Http/Controllers/PublicationController.php:15
 * @route '/api/publications/get-all'
 */
getAll63fc330aa7a7b360f25c8b6260e8943b.url = (options?: RouteQueryOptions) => {
    return getAll63fc330aa7a7b360f25c8b6260e8943b.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:15
 * @route '/api/publications/get-all'
 */
getAll63fc330aa7a7b360f25c8b6260e8943b.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAll63fc330aa7a7b360f25c8b6260e8943b.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:15
 * @route '/api/publications/get-all'
 */
getAll63fc330aa7a7b360f25c8b6260e8943b.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getAll63fc330aa7a7b360f25c8b6260e8943b.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:15
 * @route '/api/publications/get-all'
 */
    const getAll63fc330aa7a7b360f25c8b6260e8943bForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getAll63fc330aa7a7b360f25c8b6260e8943b.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:15
 * @route '/api/publications/get-all'
 */
        getAll63fc330aa7a7b360f25c8b6260e8943bForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getAll63fc330aa7a7b360f25c8b6260e8943b.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:15
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
 * @see app/Http/Controllers/PublicationController.php:15
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
 * @see app/Http/Controllers/PublicationController.php:15
 * @route '/'
 */
getAll980bb49ee7ae63891f1d891d2fbcf1c9.url = (options?: RouteQueryOptions) => {
    return getAll980bb49ee7ae63891f1d891d2fbcf1c9.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:15
 * @route '/'
 */
getAll980bb49ee7ae63891f1d891d2fbcf1c9.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAll980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:15
 * @route '/'
 */
getAll980bb49ee7ae63891f1d891d2fbcf1c9.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getAll980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:15
 * @route '/'
 */
    const getAll980bb49ee7ae63891f1d891d2fbcf1c9Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getAll980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:15
 * @route '/'
 */
        getAll980bb49ee7ae63891f1d891d2fbcf1c9Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getAll980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:15
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
 * @see app/Http/Controllers/PublicationController.php:64
 * @route '/api/publications/get/{category}/{sub_category}'
 */
export const getByCategory = (args: { category: string | number, sub_category: string | number } | [category: string | number, sub_category: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getByCategory.url(args, options),
    method: 'get',
})

getByCategory.definition = {
    methods: ["get","head"],
    url: '/api/publications/get/{category}/{sub_category}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicationController::getByCategory
 * @see app/Http/Controllers/PublicationController.php:64
 * @route '/api/publications/get/{category}/{sub_category}'
 */
getByCategory.url = (args: { category: string | number, sub_category: string | number } | [category: string | number, sub_category: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                    sub_category: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category: args.category,
                                sub_category: args.sub_category,
                }

    return getByCategory.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace('{sub_category}', parsedArgs.sub_category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::getByCategory
 * @see app/Http/Controllers/PublicationController.php:64
 * @route '/api/publications/get/{category}/{sub_category}'
 */
getByCategory.get = (args: { category: string | number, sub_category: string | number } | [category: string | number, sub_category: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getByCategory.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicationController::getByCategory
 * @see app/Http/Controllers/PublicationController.php:64
 * @route '/api/publications/get/{category}/{sub_category}'
 */
getByCategory.head = (args: { category: string | number, sub_category: string | number } | [category: string | number, sub_category: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getByCategory.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicationController::getByCategory
 * @see app/Http/Controllers/PublicationController.php:64
 * @route '/api/publications/get/{category}/{sub_category}'
 */
    const getByCategoryForm = (args: { category: string | number, sub_category: string | number } | [category: string | number, sub_category: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getByCategory.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicationController::getByCategory
 * @see app/Http/Controllers/PublicationController.php:64
 * @route '/api/publications/get/{category}/{sub_category}'
 */
        getByCategoryForm.get = (args: { category: string | number, sub_category: string | number } | [category: string | number, sub_category: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getByCategory.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicationController::getByCategory
 * @see app/Http/Controllers/PublicationController.php:64
 * @route '/api/publications/get/{category}/{sub_category}'
 */
        getByCategoryForm.head = (args: { category: string | number, sub_category: string | number } | [category: string | number, sub_category: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getByCategory.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getByCategory.form = getByCategoryForm
const PublicationController = { getAll, getByCategory }

export default PublicationController