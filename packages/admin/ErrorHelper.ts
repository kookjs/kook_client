import {get} from 'lodash'
/**
 * https://medium.com/@tarkus/validation-and-user-errors-in-graphql-mutations-39ca79cd00bf
 * @param e 
 */

export  function extractFirstError(e) {
    const errorPaths = [
        'graphQLErrors[0].message',
        'networkError.result.errors[0].message',
        'response.errors[0].message',
        'message'
    ]
    const path = errorPaths.find(path => get(e, path))
    console.log(path)
    return get(e, path)
}

export  function extractErrors(e) {
    const errors = []
    const errorPaths = [
        'graphQLErrors',
        'networkError.result.errors',
        'response.errors'
    ]
    const paths = errorPaths.filter(path => get(e, path))
    paths.forEach(path => errors.push(...get(e, path)))
    return errors ? errors : [e]
}