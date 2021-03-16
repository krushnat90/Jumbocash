package com.jumbocash.t7.dto;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name="ENTITY_MASTER")
public class EntityMaster {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private BigInteger entityId;
    
    @Column(name="entity_typ")
    private String entityType;
    private String entityName;
    private String email;
    private BigInteger phone;
    private String address;
    private String city;
    private String state;
    private Integer zip;

    @ManyToMany
    @JoinTable(name = "USER_ENTITY_LNK", joinColumns = @JoinColumn(name = "entityId"), inverseJoinColumns = @JoinColumn(name = "userId"))
    private List<AppUser> users = new ArrayList<>();

    public void addUser(AppUser user){
    	this.users.add(user);
    }
    
    public List<AppUser> getUsers() {
		return users;
	}

	public void setUsers(List<AppUser> users) {
		this.users = users;
	}

	public BigInteger getEntityId() {
        return entityId;
    }

    public void setEntityId(BigInteger entityId) {
        this.entityId = entityId;
    }

    public String getEntityType() {
        return entityType;
    }

    public void setEntityType(String entityTyp) {
        this.entityType = entityTyp;
    }

    public String getEntityName() {
        return entityName;
    }

    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public BigInteger getPhone() {
        return phone;
    }

    public void setPhone(BigInteger phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Integer getZip() {
        return zip;
    }

    public void setZip(Integer zip) {
        this.zip = zip;
    }



//    public UserEntityLnk getUserEntityLnk() {
//        return userEntityLnk;
//    }
//
//    public void setUserEntityLnk(UserEntityLnk userEntityLnk) {
//        this.userEntityLnk = userEntityLnk;
//    }

    @Override
    public String toString() {
        return "EntityMaster{" +
                "entityId=" + entityId +
                ", entityTyp='" + entityType + '\'' +
                ", entityName='" + entityName + '\'' +
                ", email='" + email + '\'' +
                ", phoneNo=" + phone +
                ", address='" + address + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", zip=" + zip +
                '}';
    }
}
