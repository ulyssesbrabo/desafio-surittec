package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity
@Table(name="users")
public class Users  implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
    @Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name", nullable=false)
     private String name;
    
    @Column(name="cpf", nullable=false)
    private String cpf;
    
    @Column(name="logradouro", nullable=false)
    private String logradouro;
    
    @Column(name="bairro", nullable=false)
    private String bairro;
    
    @Column(name="cidade", nullable=false)
    private String cidade;
    
    @Column(name="uf", nullable=false)
    private String uf;
    
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "phones_id")
	private List<Phones> phones = new ArrayList<>();

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "email_id")
	private List<Emails> listEmails = new ArrayList<>();
        

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public List<Phones> getPhones() {
		return phones;
	}

	public void setPhones(List<Phones> phones) {
		this.phones = phones;
	}

	public List<Emails> getListEmails() {
		return listEmails;
	}

	public void setListEmails(List<Emails> listEmails) {
		this.listEmails = listEmails;
	}

	public String getLogradouro() {
		return logradouro;
	}

	public void setLogradouro(String logradouro) {
		this.logradouro = logradouro;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getUf() {
		return uf;
	}

	public void setUf(String uf) {
		this.uf = uf;
	}


}
