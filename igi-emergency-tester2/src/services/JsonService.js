
class JsonService {
    stringify(objectToStringify){
        return JSON.stringify(objectToStringify, null, 4);
    }
}

export default JsonService;