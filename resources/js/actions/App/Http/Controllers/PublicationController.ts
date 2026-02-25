import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:12
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
 * @see app/Http/Controllers/PublicationController.php:12
 * @route '/api/publications/get-all'
 */
getAll.url = (options?: RouteQueryOptions) => {
    return getAll.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:12
 * @route '/api/publications/get-all'
 */
getAll.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAll.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:12
 * @route '/api/publications/get-all'
 */
getAll.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getAll.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:12
 * @route '/api/publications/get-all'
 */
    const getAllForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getAll.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:12
 * @route '/api/publications/get-all'
 */
        getAllForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getAll.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicationController::getAll
 * @see app/Http/Controllers/PublicationController.php:12
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
* @see \App\Http\Controllers\PublicationController::getByCategory
 * @see app/Http/Controllers/PublicationController.php:65
 * @route '/api/publications/category/{categorySlug}/{subCategory?}'
 */
export const getByCategory = (args: { categorySlug: string | number, subCategory?: string | number } | [categorySlug: string | number, subCategory: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getByCategory.url(args, options),
    method: 'get',
})

getByCategory.definition = {
    methods: ["get","head"],
    url: '/api/publications/category/{categorySlug}/{subCategory?}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicationController::getByCategory
 * @see app/Http/Controllers/PublicationController.php:65
 * @route '/api/publications/category/{categorySlug}/{subCategory?}'
 */
getByCategory.url = (args: { categorySlug: string | number, subCategory?: string | number } | [categorySlug: string | number, subCategory: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    categorySlug: args[0],
                    subCategory: args[1],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "subCategory",
        ])

    const parsedArgs = {
                        categorySlug: args.categorySlug,
                                subCategory: args.subCategory,
                }

    return getByCategory.definition.url
            .replace('{categorySlug}', parsedArgs.categorySlug.toString())
            .replace('{subCategory?}', parsedArgs.subCategory?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::getByCategory
 * @see app/Http/Controllers/PublicationController.php:65
 * @route '/api/publications/category/{categorySlug}/{subCategory?}'
 */
getByCategory.get = (args: { categorySlug: string | number, subCategory?: string | number } | [categorySlug: string | number, subCategory: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getByCategory.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicationController::getByCategory
 * @see app/Http/Controllers/PublicationController.php:65
 * @route '/api/publications/category/{categorySlug}/{subCategory?}'
 */
getByCategory.head = (args: { categorySlug: string | number, subCategory?: string | number } | [categorySlug: string | number, subCategory: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getByCategory.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicationController::getByCategory
 * @see app/Http/Controllers/PublicationController.php:65
 * @route '/api/publications/category/{categorySlug}/{subCategory?}'
 */
    const getByCategoryForm = (args: { categorySlug: string | number, subCategory?: string | number } | [categorySlug: string | number, subCategory: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getByCategory.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicationController::getByCategory
 * @see app/Http/Controllers/PublicationController.php:65
 * @route '/api/publications/category/{categorySlug}/{subCategory?}'
 */
        getByCategoryForm.get = (args: { categorySlug: string | number, subCategory?: string | number } | [categorySlug: string | number, subCategory: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getByCategory.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicationController::getByCategory
 * @see app/Http/Controllers/PublicationController.php:65
 * @route '/api/publications/category/{categorySlug}/{subCategory?}'
 */
        getByCategoryForm.head = (args: { categorySlug: string | number, subCategory?: string | number } | [categorySlug: string | number, subCategory: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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