export interface CTGovItem {
    BriefTitle: string[],
    Condition: string[],
    NCTId: string[],
    OverallStatus: string[],
    PrimaryCompletionDate: string[],
    Rank: number
}

export interface CTGovResponse {
    StudyFieldsResponse: {
        NStudiesReturned: number;
        StudyFields: CTGovItem[];
    }
}