export function handledError(error: any, tableName: string): any {
    console.error(`서버: ${tableName}에서 데이터를 가져오는 중 오류 발생:`, error);
    return [];
}
export function handledUploadError(error: any, storage: string): any {
    console.error(`서버: ${storage}에서 데이터를 업로드 하는 중 오류 발생:`, error);
    return null;
}