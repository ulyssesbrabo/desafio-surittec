import { EmaislUsers } from './emailUsers.model';
import { PhoneUsers } from './phoneUsers.model';

export class SalveUsers {

    public name !: string;

    public cpf !: string;

    public logradouro !: string;

    public bairro !: string;

    public cidade!: string; 

    public uf !: string;

    public phones !: Array<PhoneUsers>;

    public listEmails !: Array<EmaislUsers>;
}