using {com.ey.trs as db} from '../db/data-model';

service Attachments {
    entity Files as projection on db.Files
}
