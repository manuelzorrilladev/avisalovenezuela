import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\UserController::dashboard
 * @see app/Http/Controllers/UserController.php:34
 * @route '/dashboard/w'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/dashboard/w',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserController::dashboard
 * @see app/Http/Controllers/UserController.php:34
 * @route '/dashboard/w'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::dashboard
 * @see app/Http/Controllers/UserController.php:34
 * @route '/dashboard/w'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UserController::dashboard
 * @see app/Http/Controllers/UserController.php:34
 * @route '/dashboard/w'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\UserController::dashboard
 * @see app/Http/Controllers/UserController.php:34
 * @route '/dashboard/w'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\UserController::dashboard
 * @see app/Http/Controllers/UserController.php:34
 * @route '/dashboard/w'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\UserController::dashboard
 * @see app/Http/Controllers/UserController.php:34
 * @route '/dashboard/w'
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
const worker = {
    dashboard: Object.assign(dashboard, dashboard),
}

export default worker