module.exports.templateTags = [{
    name: 'jsEnv',
    displayName: 'JavaScript Tag with Env variables',
    description: 'Generate a tag by modifying the reponse with JavaScript and env varables.',
    args: [
        {
            displayName: 'JavaScript function (first argument has metadata and headers, second has response body)',
            description: 'JavaScript function',
            defaultValue: '(metadata, body) => body',
            type: 'string'
        },
        {
            displayName: 'Request',
            type: 'model',
            model: 'Request'
        }
    ],
    async run (context, input, requestId) {
        const request = await context.util.models.request.getById(requestId);
        if (request == null) {
            return 'Select a request first';
        }

        const envId = context.context.getEnvironmentId();
        let response = await context.util.models.response.getLatestForRequestId(requestId, envId);
        
        if (response == null) {
            return 'Execute the selected request first';
        }
        const responseBody = context.util.models.response.getBodyBuffer(response, '').toString();

        const regex = /\${([^}]*)}/g;
        let matches = input.match(regex);
        matches?.forEach(element => {
            let envVariableName = element.substring(2, element.length - 1);
            let envVariable = '"' + context.context[envVariableName] + '"';
            input = input.replace(element, envVariable);
        });
        console.log(input);
        try {
            eval("var func = " + input);
        } catch (e) {
            return e;
        }

        return func(response, responseBody);
    }
}];