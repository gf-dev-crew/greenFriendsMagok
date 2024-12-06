export async function pagenation(nowPage: number, isLast: boolean, query: any, count: number, tableName: string) {
    if (nowPage == 1) { // 처음 데이터 호출 시
        let lastPage = 1
        let returnData = { data: [], count: 0, lastPage: 1 } as { data: any, count: number, lastPage: number }
        if (count > 10) { // 데이터가 10개 이상 있을 시
            lastPage = Math.floor(count / 10) + 1
            const { data, error } = await query.range(0, 9);
            returnData.data = data
            returnData.count = count
            returnData.lastPage = lastPage
            if (error) {
                return handleError(error, tableName);
            }
            return returnData || []
        } else { // 데이터가 10개 미만일 시
            const { data, error } = await query;
            returnData.data = data
            returnData.count = count ? count : 0
            returnData.lastPage = lastPage
            if (error) {
                return handleError(error, tableName);
            }
            return returnData || []
        }
    }
    else if (nowPage > 1) { // 페이지 데이터 호출 시
        if (isLast) { // 마지막 페이지 일 때
            const { data, error } = await query.range(nowPage * 10 - 10, count ? count - 1 : 0);
            if (error) {
                return handleError(error, tableName);
            }
            return data || []
        } else { // 마지막 페이지가 아닐 때
            const { data, error } = await query.range(nowPage * 10 - 10, nowPage * 10 - 1);
            if (error) {
                return handleError(error, tableName);
            }
            return data || []
        }
    }
}

function handleError(error: any, tableName: string): any[] {
  console.error(`서버: ${tableName}에서 데이터를 가져오는 중 오류 발생:`, error);
  return [];
}