import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PublicationController::create
 * @see app/Http/Controllers/PublicationController.php:86
 * @route '/dashboard/publicacion/crear'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/dashboard/publicacion/crear',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicationController::create
 * @see app/Http/Controllers/PublicationController.php:86
 * @route '/dashboard/publicacion/crear'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::create
 * @see app/Http/Controllers/PublicationController.php:86
 * @route '/dashboard/publicacion/crear'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicationController::create
 * @see app/Http/Controllers/PublicationController.php:86
 * @route '/dashboard/publicacion/crear'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicationController::create
 * @see app/Http/Controllers/PublicationController.php:86
 * @route '/dashboard/publicacion/crear'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicationController::create
 * @see app/Http/Controllers/PublicationController.php:86
 * @route '/dashboard/publicacion/crear'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicationController::create
 * @see app/Http/Controllers/PublicationController.php:86
 * @route '/dashboard/publicacion/crear'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\PublicationController::view
 * @see app/Http/Controllers/PublicationController.php:96
 * @route '/dashboard/publicacion/{publication}'
 */
export const view = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(args, options),
    method: 'get',
})

view.definition = {
    methods: ["get","head"],
    url: '/dashboard/publicacion/{publication}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicationController::view
 * @see app/Http/Controllers/PublicationController.php:96
 * @route '/dashboard/publicacion/{publication}'
 */
view.url = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { publication: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { publication: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    publication: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        publication: typeof args.publication === 'object'
                ? args.publication.id
                : args.publication,
                }

    return view.definition.url
            .replace('{publication}', parsedArgs.publication.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::view
 * @see app/Http/Controllers/PublicationController.php:96
 * @route '/dashboard/publicacion/{publication}'
 */
view.get = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicationController::view
 * @see app/Http/Controllers/PublicationController.php:96
 * @route '/dashboard/publicacion/{publication}'
 */
view.head = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: view.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicationController::view
 * @see app/Http/Controllers/PublicationController.php:96
 * @route '/dashboard/publicacion/{publication}'
 */
    const viewForm = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: view.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicationController::view
 * @see app/Http/Controllers/PublicationController.php:96
 * @route '/dashboard/publicacion/{publication}'
 */
        viewForm.get = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: view.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicationController::view
 * @see app/Http/Controllers/PublicationController.php:96
 * @route '/dashboard/publicacion/{publication}'
 */
        viewForm.head = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: view.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    view.form = viewForm
/**
* @see \App\Http\Controllers\PublicationController::download
 * @see app/Http/Controllers/PublicationController.php:125
 * @route '/dashboard/publicacion/{id}/files'
 */
export const download = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/dashboard/publicacion/{id}/files',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicationController::download
 * @see app/Http/Controllers/PublicationController.php:125
 * @route '/dashboard/publicacion/{id}/files'
 */
download.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return download.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::download
 * @see app/Http/Controllers/PublicationController.php:125
 * @route '/dashboard/publicacion/{id}/files'
 */
download.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicationController::download
 * @see app/Http/Controllers/PublicationController.php:125
 * @route '/dashboard/publicacion/{id}/files'
 */
download.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicationController::download
 * @see app/Http/Controllers/PublicationController.php:125
 * @route '/dashboard/publicacion/{id}/files'
 */
    const downloadForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: download.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicationController::download
 * @see app/Http/Controllers/PublicationController.php:125
 * @route '/dashboard/publicacion/{id}/files'
 */
        downloadForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicationController::download
 * @see app/Http/Controllers/PublicationController.php:125
 * @route '/dashboard/publicacion/{id}/files'
 */
        downloadForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    download.form = downloadForm
/**
* @see \App\Http\Controllers\PublicationController::store
 * @see app/Http/Controllers/PublicationController.php:188
 * @route '/dashboard/publicacion'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/publicacion',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PublicationController::store
 * @see app/Http/Controllers/PublicationController.php:188
 * @route '/dashboard/publicacion'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::store
 * @see app/Http/Controllers/PublicationController.php:188
 * @route '/dashboard/publicacion'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PublicationController::store
 * @see app/Http/Controllers/PublicationController.php:188
 * @route '/dashboard/publicacion'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PublicationController::store
 * @see app/Http/Controllers/PublicationController.php:188
 * @route '/dashboard/publicacion'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\PublicationController::assign
 * @see app/Http/Controllers/PublicationController.php:348
 * @route '/dashboard/publicacion/{id}/asignar'
 */
export const assign = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: assign.url(args, options),
    method: 'patch',
})

assign.definition = {
    methods: ["patch"],
    url: '/dashboard/publicacion/{id}/asignar',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\PublicationController::assign
 * @see app/Http/Controllers/PublicationController.php:348
 * @route '/dashboard/publicacion/{id}/asignar'
 */
assign.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return assign.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::assign
 * @see app/Http/Controllers/PublicationController.php:348
 * @route '/dashboard/publicacion/{id}/asignar'
 */
assign.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: assign.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\PublicationController::assign
 * @see app/Http/Controllers/PublicationController.php:348
 * @route '/dashboard/publicacion/{id}/asignar'
 */
    const assignForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: assign.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PublicationController::assign
 * @see app/Http/Controllers/PublicationController.php:348
 * @route '/dashboard/publicacion/{id}/asignar'
 */
        assignForm.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: assign.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    assign.form = assignForm
/**
* @see \App\Http\Controllers\PublicationController::status
 * @see app/Http/Controllers/PublicationController.php:371
 * @route '/dashboard/publicacion/{id}/status'
 */
export const status = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: status.url(args, options),
    method: 'patch',
})

status.definition = {
    methods: ["patch"],
    url: '/dashboard/publicacion/{id}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\PublicationController::status
 * @see app/Http/Controllers/PublicationController.php:371
 * @route '/dashboard/publicacion/{id}/status'
 */
status.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return status.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::status
 * @see app/Http/Controllers/PublicationController.php:371
 * @route '/dashboard/publicacion/{id}/status'
 */
status.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: status.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\PublicationController::status
 * @see app/Http/Controllers/PublicationController.php:371
 * @route '/dashboard/publicacion/{id}/status'
 */
    const statusForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: status.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PublicationController::status
 * @see app/Http/Controllers/PublicationController.php:371
 * @route '/dashboard/publicacion/{id}/status'
 */
        statusForm.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: status.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    status.form = statusForm
const publicacion = {
    create: Object.assign(create, create),
view: Object.assign(view, view),
download: Object.assign(download, download),
store: Object.assign(store, store),
assign: Object.assign(assign, assign),
status: Object.assign(status, status),
}

export default publicacion