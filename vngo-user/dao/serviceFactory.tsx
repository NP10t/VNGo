import { MockDao } from "./dataAccess/mockDao";

export class ServiceFactory {
    static getMockDao() {
        return MockDao.getInstance();
    }
}