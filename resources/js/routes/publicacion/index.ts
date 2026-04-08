import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PublicationController::create
 * @see app/Http/Controllers/PublicationController.php:153
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
 * @see app/Http/Controllers/PublicationController.php:153
 * @route '/dashboard/publicacion/crear'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::create
 * @see app/Http/Controllers/PublicationController.php:153
 * @route '/dashboard/publicacion/crear'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicationController::create
 * @see app/Http/Controllers/PublicationController.php:153
 * @route '/dashboard/publicacion/crear'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicationController::create
 * @see app/Http/Controllers/PublicationController.php:153
 * @route '/dashboard/publicacion/crear'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicationController::create
 * @see app/Http/Controllers/PublicationController.php:153
 * @route '/dashboard/publicacion/crear'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicationController::create
 * @see app/Http/Controllers/PublicationController.php:153
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
* @see \App\Http\Controllers\PublicationController::edit
 * @see app/Http/Controllers/PublicationController.php:165
 * @route '/dashboard/publicacion/{publication}/editar'
 */
export const edit = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/dashboard/publicacion/{publication}/editar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicationController::edit
 * @see app/Http/Controllers/PublicationController.php:165
 * @route '/dashboard/publicacion/{publication}/editar'
 */
edit.url = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{publication}', parsedArgs.publication.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::edit
 * @see app/Http/Controllers/PublicationController.php:165
 * @route '/dashboard/publicacion/{publication}/editar'
 */
edit.get = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicationController::edit
 * @see app/Http/Controllers/PublicationController.php:165
 * @route '/dashboard/publicacion/{publication}/editar'
 */
edit.head = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicationController::edit
 * @see app/Http/Controllers/PublicationController.php:165
 * @route '/dashboard/publicacion/{publication}/editar'
 */
    const editForm = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicationController::edit
 * @see app/Http/Controllers/PublicationController.php:165
 * @route '/dashboard/publicacion/{publication}/editar'
 */
        editForm.get = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicationController::edit
 * @see app/Http/Controllers/PublicationController.php:165
 * @route '/dashboard/publicacion/{publication}/editar'
 */
        editForm.head = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\PublicationController::update
 * @see app/Http/Controllers/PublicationController.php:263
 * @route '/dashboard/publicacion/{publication}'
 */
export const update = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/publicacion/{publication}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\PublicationController::update
 * @see app/Http/Controllers/PublicationController.php:263
 * @route '/dashboard/publicacion/{publication}'
 */
update.url = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{publication}', parsedArgs.publication.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::update
 * @see app/Http/Controllers/PublicationController.php:263
 * @route '/dashboard/publicacion/{publication}'
 */
update.put = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\PublicationController::update
 * @see app/Http/Controllers/PublicationController.php:263
 * @route '/dashboard/publicacion/{publication}'
 */
    const updateForm = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PublicationController::update
 * @see app/Http/Controllers/PublicationController.php:263
 * @route '/dashboard/publicacion/{publication}'
 */
        updateForm.put = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\PublicationController::status
 * @see app/Http/Controllers/PublicationController.php:372
 * @route '/dashboard/publicacion/{publication}/status'
 */
export const status = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: status.url(args, options),
    method: 'patch',
})

status.definition = {
    methods: ["patch"],
    url: '/dashboard/publicacion/{publication}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\PublicationController::status
 * @see app/Http/Controllers/PublicationController.php:372
 * @route '/dashboard/publicacion/{publication}/status'
 */
status.url = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return status.definition.url
            .replace('{publication}', parsedArgs.publication.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::status
 * @see app/Http/Controllers/PublicationController.php:372
 * @route '/dashboard/publicacion/{publication}/status'
 */
status.patch = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: status.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\PublicationController::status
 * @see app/Http/Controllers/PublicationController.php:372
 * @route '/dashboard/publicacion/{publication}/status'
 */
    const statusForm = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/PublicationController.php:372
 * @route '/dashboard/publicacion/{publication}/status'
 */
        statusForm.patch = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
status: Object.assign(status, status),
}

export default publicacion