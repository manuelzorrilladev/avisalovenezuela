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
 * @see app/Http/Controllers/PublicationController.php:86
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
 * @see app/Http/Controllers/PublicationController.php:86
 * @route '/dashboard/publicacion/crear'
 */
publicationCreate.url = (options?: RouteQueryOptions) => {
    return publicationCreate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::publicationCreate
 * @see app/Http/Controllers/PublicationController.php:86
 * @route '/dashboard/publicacion/crear'
 */
publicationCreate.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicationCreate.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicationController::publicationCreate
 * @see app/Http/Controllers/PublicationController.php:86
 * @route '/dashboard/publicacion/crear'
 */
publicationCreate.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: publicationCreate.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicationController::publicationCreate
 * @see app/Http/Controllers/PublicationController.php:86
 * @route '/dashboard/publicacion/crear'
 */
    const publicationCreateForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: publicationCreate.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicationController::publicationCreate
 * @see app/Http/Controllers/PublicationController.php:86
 * @route '/dashboard/publicacion/crear'
 */
        publicationCreateForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: publicationCreate.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicationController::publicationCreate
 * @see app/Http/Controllers/PublicationController.php:86
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
* @see \App\Http\Controllers\PublicationController::publicationView
 * @see app/Http/Controllers/PublicationController.php:96
 * @route '/dashboard/publicacion/{publication}'
 */
export const publicationView = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicationView.url(args, options),
    method: 'get',
})

publicationView.definition = {
    methods: ["get","head"],
    url: '/dashboard/publicacion/{publication}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicationController::publicationView
 * @see app/Http/Controllers/PublicationController.php:96
 * @route '/dashboard/publicacion/{publication}'
 */
publicationView.url = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return publicationView.definition.url
            .replace('{publication}', parsedArgs.publication.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::publicationView
 * @see app/Http/Controllers/PublicationController.php:96
 * @route '/dashboard/publicacion/{publication}'
 */
publicationView.get = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicationView.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicationController::publicationView
 * @see app/Http/Controllers/PublicationController.php:96
 * @route '/dashboard/publicacion/{publication}'
 */
publicationView.head = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: publicationView.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicationController::publicationView
 * @see app/Http/Controllers/PublicationController.php:96
 * @route '/dashboard/publicacion/{publication}'
 */
    const publicationViewForm = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: publicationView.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicationController::publicationView
 * @see app/Http/Controllers/PublicationController.php:96
 * @route '/dashboard/publicacion/{publication}'
 */
        publicationViewForm.get = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: publicationView.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicationController::publicationView
 * @see app/Http/Controllers/PublicationController.php:96
 * @route '/dashboard/publicacion/{publication}'
 */
        publicationViewForm.head = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: publicationView.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    publicationView.form = publicationViewForm
/**
* @see \App\Http\Controllers\PublicationController::publicationDownload
 * @see app/Http/Controllers/PublicationController.php:125
 * @route '/dashboard/publicacion/{id}/files'
 */
export const publicationDownload = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicationDownload.url(args, options),
    method: 'get',
})

publicationDownload.definition = {
    methods: ["get","head"],
    url: '/dashboard/publicacion/{id}/files',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicationController::publicationDownload
 * @see app/Http/Controllers/PublicationController.php:125
 * @route '/dashboard/publicacion/{id}/files'
 */
publicationDownload.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return publicationDownload.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::publicationDownload
 * @see app/Http/Controllers/PublicationController.php:125
 * @route '/dashboard/publicacion/{id}/files'
 */
publicationDownload.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicationDownload.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicationController::publicationDownload
 * @see app/Http/Controllers/PublicationController.php:125
 * @route '/dashboard/publicacion/{id}/files'
 */
publicationDownload.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: publicationDownload.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicationController::publicationDownload
 * @see app/Http/Controllers/PublicationController.php:125
 * @route '/dashboard/publicacion/{id}/files'
 */
    const publicationDownloadForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: publicationDownload.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicationController::publicationDownload
 * @see app/Http/Controllers/PublicationController.php:125
 * @route '/dashboard/publicacion/{id}/files'
 */
        publicationDownloadForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: publicationDownload.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicationController::publicationDownload
 * @see app/Http/Controllers/PublicationController.php:125
 * @route '/dashboard/publicacion/{id}/files'
 */
        publicationDownloadForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: publicationDownload.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    publicationDownload.form = publicationDownloadForm
/**
* @see \App\Http\Controllers\PublicationController::publicationStore
 * @see app/Http/Controllers/PublicationController.php:188
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
 * @see app/Http/Controllers/PublicationController.php:188
 * @route '/dashboard/publicacion'
 */
publicationStore.url = (options?: RouteQueryOptions) => {
    return publicationStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::publicationStore
 * @see app/Http/Controllers/PublicationController.php:188
 * @route '/dashboard/publicacion'
 */
publicationStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: publicationStore.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PublicationController::publicationStore
 * @see app/Http/Controllers/PublicationController.php:188
 * @route '/dashboard/publicacion'
 */
    const publicationStoreForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: publicationStore.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PublicationController::publicationStore
 * @see app/Http/Controllers/PublicationController.php:188
 * @route '/dashboard/publicacion'
 */
        publicationStoreForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: publicationStore.url(options),
            method: 'post',
        })
    
    publicationStore.form = publicationStoreForm
/**
* @see \App\Http\Controllers\PublicationController::assign
 * @see app/Http/Controllers/PublicationController.php:345
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
 * @see app/Http/Controllers/PublicationController.php:345
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
 * @see app/Http/Controllers/PublicationController.php:345
 * @route '/dashboard/publicacion/{id}/asignar'
 */
assign.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: assign.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\PublicationController::assign
 * @see app/Http/Controllers/PublicationController.php:345
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
 * @see app/Http/Controllers/PublicationController.php:345
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
* @see \App\Http\Controllers\PublicationController::toggleStatus
 * @see app/Http/Controllers/PublicationController.php:368
 * @route '/dashboard/publicacion/{id}/status'
 */
export const toggleStatus = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleStatus.url(args, options),
    method: 'patch',
})

toggleStatus.definition = {
    methods: ["patch"],
    url: '/dashboard/publicacion/{id}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\PublicationController::toggleStatus
 * @see app/Http/Controllers/PublicationController.php:368
 * @route '/dashboard/publicacion/{id}/status'
 */
toggleStatus.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return toggleStatus.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicationController::toggleStatus
 * @see app/Http/Controllers/PublicationController.php:368
 * @route '/dashboard/publicacion/{id}/status'
 */
toggleStatus.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleStatus.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\PublicationController::toggleStatus
 * @see app/Http/Controllers/PublicationController.php:368
 * @route '/dashboard/publicacion/{id}/status'
 */
    const toggleStatusForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/PublicationController.php:368
 * @route '/dashboard/publicacion/{id}/status'
 */
        toggleStatusForm.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    toggleStatus.form = toggleStatusForm
const PublicationController = { getAll, HomeForm, publicationCreate, publicationView, publicationDownload, publicationStore, assign, toggleStatus }

export default PublicationController