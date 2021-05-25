import { ListaPerfil } from './listaPerfil.model';

export class RegistroUsersApplication {

    loginUser !: string;
    password !: string;
    loggedIn !: string;
    listPerfil !: Array<ListaPerfil>;

}