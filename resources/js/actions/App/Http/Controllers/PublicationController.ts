import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
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
const PublicationController = { getAll }

export default PublicationController