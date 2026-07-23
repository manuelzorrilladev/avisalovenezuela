import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\UserController::dashboard
 * @see app/Http/Controllers/UserController.php:14
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
 * @see app/Http/Controllers/UserController.php:14
 * @route '/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::dashboard
 * @see app/Http/Controllers/UserController.php:14
 * @route '/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UserController::dashboard
 * @see app/Http/Controllers/UserController.php:14
 * @route '/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\UserController::dashboard
 * @see app/Http/Controllers/UserController.php:14
 * @route '/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\UserController::dashboard
 * @see app/Http/Controllers/UserController.php:14
 * @route '/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\UserController::dashboard
 * @see app/Http/Controllers/UserController.php:14
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
/**
* @see \App\Http\Controllers\UserController::workerDashboard
 * @see app/Http/Controllers/UserController.php:34
 * @route '/dashboard/w'
 */
export const workerDashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: workerDashboard.url(options),
    method: 'get',
})

workerDashboard.definition = {
    methods: ["get","head"],
    url: '/dashboard/w',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserController::workerDashboard
 * @see app/Http/Controllers/UserController.php:34
 * @route '/dashboard/w'
 */
workerDashboard.url = (options?: RouteQueryOptions) => {
    return workerDashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::workerDashboard
 * @see app/Http/Controllers/UserController.php:34
 * @route '/dashboard/w'
 */
workerDashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: workerDashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UserController::workerDashboard
 * @see app/Http/Controllers/UserController.php:34
 * @route '/dashboard/w'
 */
workerDashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: workerDashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\UserController::workerDashboard
 * @see app/Http/Controllers/UserController.php:34
 * @route '/dashboard/w'
 */
    const workerDashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: workerDashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\UserController::workerDashboard
 * @see app/Http/Controllers/UserController.php:34
 * @route '/dashboard/w'
 */
        workerDashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: workerDashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\UserController::workerDashboard
 * @see app/Http/Controllers/UserController.php:34
 * @route '/dashboard/w'
 */
        workerDashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: workerDashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    workerDashboard.form = workerDashboardForm
const UserController = { dashboard, workerDashboard }

export default UserController