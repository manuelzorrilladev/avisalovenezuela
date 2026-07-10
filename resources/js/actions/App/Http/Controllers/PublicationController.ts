import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\PublicationController::HomeForm
 * @see app/Http/Controllers/PublicationController.php:23
 * @route '/'
 */
export const HomeForm = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: HomeForm.url(options),
    method: 'get',
})

HomeForm.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicationController::HomeForm
 * @see app/Http/Controllers/PublicationController.php:23
 * @route '/'
 */
HomeForm.url = (options?: RouteQueryOptions) => {
    return HomeForm.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::HomeForm
 * @see app/Http/Controllers/PublicationController.php:23
 * @route '/'
 */
HomeForm.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: HomeForm.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicationController::HomeForm
 * @see app/Http/Controllers/PublicationController.php:23
 * @route '/'
 */
HomeForm.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: HomeForm.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicationController::HomeForm
 * @see app/Http/Controllers/PublicationController.php:23
 * @route '/'
 */
    const HomeFormForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: HomeForm.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicationController::HomeForm
 * @see app/Http/Controllers/PublicationController.php:23
 * @route '/'
 */
        HomeFormForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: HomeForm.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicationController::HomeForm
 * @see app/Http/Controllers/PublicationController.php:23
 * @route '/'
 */
        HomeFormForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: HomeForm.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    HomeForm.form = HomeFormForm
/**
* @see \App\Http\Controllers\PublicationController::publicationCreate
 * @see app/Http/Controllers/PublicationController.php:162
 * @route '/dashboard/publicacion/crear'
 */
export const publicationCreate = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicationCreate.url(options),
    method: 'get',
})

publicationCreate.definition = {
    methods: ["get","head"],
    url: '/dashboard/publicacion/crear',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicationController::publicationCreate
 * @see app/Http/Controllers/PublicationController.php:162
 * @route '/dashboard/publicacion/crear'
 */
publicationCreate.url = (options?: RouteQueryOptions) => {
    return publicationCreate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::publicationCreate
 * @see app/Http/Controllers/PublicationController.php:162
 * @route '/dashboard/publicacion/crear'
 */
publicationCreate.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicationCreate.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicationController::publicationCreate
 * @see app/Http/Controllers/PublicationController.php:162
 * @route '/dashboard/publicacion/crear'
 */
publicationCreate.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: publicationCreate.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicationController::publicationCreate
 * @see app/Http/Controllers/PublicationController.php:162
 * @route '/dashboard/publicacion/crear'
 */
    const publicationCreateForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: publicationCreate.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicationController::publicationCreate
 * @see app/Http/Controllers/PublicationController.php:162
 * @route '/dashboard/publicacion/crear'
 */
        publicationCreateForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: publicationCreate.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicationController::publicationCreate
 * @see app/Http/Controllers/PublicationController.php:162
 * @route '/dashboard/publicacion/crear'
 */
        publicationCreateForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: publicationCreate.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    publicationCreate.form = publicationCreateForm
/**
* @see \App\Http\Controllers\PublicationController::publicationStore
 * @see app/Http/Controllers/PublicationController.php:195
 * @route '/dashboard/publicacion'
 */
export const publicationStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: publicationStore.url(options),
    method: 'post',
})

publicationStore.definition = {
    methods: ["post"],
    url: '/dashboard/publicacion',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PublicationController::publicationStore
 * @see app/Http/Controllers/PublicationController.php:195
 * @route '/dashboard/publicacion'
 */
publicationStore.url = (options?: RouteQueryOptions) => {
    return publicationStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::publicationStore
 * @see app/Http/Controllers/PublicationController.php:195
 * @route '/dashboard/publicacion'
 */
publicationStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: publicationStore.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PublicationController::publicationStore
 * @see app/Http/Controllers/PublicationController.php:195
 * @route '/dashboard/publicacion'
 */
    const publicationStoreForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: publicationStore.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PublicationController::publicationStore
 * @see app/Http/Controllers/PublicationController.php:195
 * @route '/dashboard/publicacion'
 */
        publicationStoreForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: publicationStore.url(options),
            method: 'post',
        })
    
    publicationStore.form = publicationStoreForm
/**
* @see \App\Http\Controllers\PublicationController::publicationEdit
 * @see app/Http/Controllers/PublicationController.php:172
 * @route '/dashboard/publicacion/{publication}/editar'
 */
export const publicationEdit = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicationEdit.url(args, options),
    method: 'get',
})

publicationEdit.definition = {
    methods: ["get","head"],
    url: '/dashboard/publicacion/{publication}/editar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicationController::publicationEdit
 * @see app/Http/Controllers/PublicationController.php:172
 * @route '/dashboard/publicacion/{publication}/editar'
 */
publicationEdit.url = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return publicationEdit.definition.url
            .replace('{publication}', parsedArgs.publication.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::publicationEdit
 * @see app/Http/Controllers/PublicationController.php:172
 * @route '/dashboard/publicacion/{publication}/editar'
 */
publicationEdit.get = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicationEdit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicationController::publicationEdit
 * @see app/Http/Controllers/PublicationController.php:172
 * @route '/dashboard/publicacion/{publication}/editar'
 */
publicationEdit.head = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: publicationEdit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicationController::publicationEdit
 * @see app/Http/Controllers/PublicationController.php:172
 * @route '/dashboard/publicacion/{publication}/editar'
 */
    const publicationEditForm = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: publicationEdit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicationController::publicationEdit
 * @see app/Http/Controllers/PublicationController.php:172
 * @route '/dashboard/publicacion/{publication}/editar'
 */
        publicationEditForm.get = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: publicationEdit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicationController::publicationEdit
 * @see app/Http/Controllers/PublicationController.php:172
 * @route '/dashboard/publicacion/{publication}/editar'
 */
        publicationEditForm.head = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: publicationEdit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    publicationEdit.form = publicationEditForm
/**
* @see \App\Http\Controllers\PublicationController::publicationUpdate
 * @see app/Http/Controllers/PublicationController.php:270
 * @route '/dashboard/publicacion/{publication}'
 */
export const publicationUpdate = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: publicationUpdate.url(args, options),
    method: 'put',
})

publicationUpdate.definition = {
    methods: ["put"],
    url: '/dashboard/publicacion/{publication}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\PublicationController::publicationUpdate
 * @see app/Http/Controllers/PublicationController.php:270
 * @route '/dashboard/publicacion/{publication}'
 */
publicationUpdate.url = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return publicationUpdate.definition.url
            .replace('{publication}', parsedArgs.publication.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::publicationUpdate
 * @see app/Http/Controllers/PublicationController.php:270
 * @route '/dashboard/publicacion/{publication}'
 */
publicationUpdate.put = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: publicationUpdate.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\PublicationController::publicationUpdate
 * @see app/Http/Controllers/PublicationController.php:270
 * @route '/dashboard/publicacion/{publication}'
 */
    const publicationUpdateForm = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: publicationUpdate.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PublicationController::publicationUpdate
 * @see app/Http/Controllers/PublicationController.php:270
 * @route '/dashboard/publicacion/{publication}'
 */
        publicationUpdateForm.put = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: publicationUpdate.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    publicationUpdate.form = publicationUpdateForm
/**
* @see \App\Http\Controllers\PublicationController::toggleStatus
 * @see app/Http/Controllers/PublicationController.php:379
 * @route '/dashboard/publicacion/{publication}/status'
 */
export const toggleStatus = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleStatus.url(args, options),
    method: 'patch',
})

toggleStatus.definition = {
    methods: ["patch"],
    url: '/dashboard/publicacion/{publication}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\PublicationController::toggleStatus
 * @see app/Http/Controllers/PublicationController.php:379
 * @route '/dashboard/publicacion/{publication}/status'
 */
toggleStatus.url = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return toggleStatus.definition.url
            .replace('{publication}', parsedArgs.publication.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::toggleStatus
 * @see app/Http/Controllers/PublicationController.php:379
 * @route '/dashboard/publicacion/{publication}/status'
 */
toggleStatus.patch = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleStatus.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\PublicationController::toggleStatus
 * @see app/Http/Controllers/PublicationController.php:379
 * @route '/dashboard/publicacion/{publication}/status'
 */
    const toggleStatusForm = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PublicationController::toggleStatus
 * @see app/Http/Controllers/PublicationController.php:379
 * @route '/dashboard/publicacion/{publication}/status'
 */
        toggleStatusForm.patch = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    toggleStatus.form = toggleStatusForm
const PublicationController = { getAll, HomeForm, publicationCreate, publicationStore, publicationEdit, publicationUpdate, toggleStatus }

export default PublicationController