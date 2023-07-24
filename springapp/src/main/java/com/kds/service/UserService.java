package com.kds.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kds.models.Orders;
import com.kds.models.User;
import com.kds.repositories.OrderRepo;
import com.kds.repositories.UserRepo;
@Service
public class UserService {
	
	@Autowired
	private UserRepo Repo;
	
	@Autowired
	private OrderRepo orepo;
	
    public boolean deleteStaff(int id) {
        if (Repo.findById(id).isPresent()) {
            Repo.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
    public List<User> getAllStaff() {
        return Repo.findAll();
    }

	public String SignUpx(User staffx) {
        String email = staffx.getEmail();
        User staffxAuth = Repo.findByEmail(email);
        if (staffxAuth == null) {
            Repo.save(staffx);
            return "Signup Successful !";
        } else {
            if (staffxAuth.getEmail().equals(email)) {
                return "Email ID Already Exists";
            } else {
                return "Invalid Email ID";
            }
        }
    } 
	public String Loginx(String email, String password) {
		User userx = Repo.findByEmail(email);
		if (userx == null) {
			return "Invalid Email !";
		} else {
			if (userx.getPassword().equals(password)) {
				return userx.getRole();
			} else {
				return "Invalid Password";
			}
		}
	}
	//Create orders

    public Orders createOrder(Orders ord) {
        return orepo.save(ord);
    }

    //get Order

    public List<Orders> getAllOrder() {
        return orepo.findAll();
    }
    


  
}