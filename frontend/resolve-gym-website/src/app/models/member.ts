import { MonthlyPlan } from "./monthly-plan";
import { Progress } from "./progress";
import { RoutineResponse } from "./routine";

export interface MemberRequest {
    _id:String;
    state: String;
    routines: String[];
    progress: String[];
    mounthlyPlan: String[];
    img: {
        data: Buffer;
        contentType: string;
    };
    
}

export interface MemberResponse {
    _id:String;
    state: String;
    routines: RoutineResponse[];
    progress: Progress[];
    mounthlyPlan: MonthlyPlan[];
    img: {
        data: Buffer;
        contentType: string;
    };

}
