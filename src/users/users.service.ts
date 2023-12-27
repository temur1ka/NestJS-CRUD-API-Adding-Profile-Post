import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/typeorm/entities/Post';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { createPostParams, createProfileParams, updatedUserParams, userParams } from 'src/utils/type';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
        @InjectRepository(Posts) private postRepository: Repository <Posts>, 
    )
    {}

    findAll(){
        const findAll = this.userRepository.find({relations:['profile', 'posts']});
        return findAll;
    }

    createUser(userDetails: userParams){
        const newUser = this.userRepository.create({...userDetails, createAt: new Date});
        return this.userRepository.save(newUser);

    }

    async updateUser(id: number, updateParams: updatedUserParams){
        await this.userRepository.update({id}, {...updateParams})
       
    }
    
    async deleteUsers(id:number) {
        await this.userRepository.delete({id})
    }

    async createProfile(id:number ,profileParams: createProfileParams) {
        const user = await this.userRepository.findOneBy({id});
        if(!user) throw new HttpException("User Does not Exist", HttpStatus.BAD_REQUEST);

        const newProfile = this.profileRepository.create(profileParams);
        const saveProfile = await this.profileRepository.save(newProfile);
        user.profile = saveProfile;
        return this.userRepository.save(user);


    }

    async createPost(id:number, postParams: createPostParams ) {
        const user = await this.userRepository.findOneBy({id});
        if(!user) throw new HttpException("User Does not Exist!", HttpStatus.BAD_REQUEST);

        const newPost = this.postRepository.create({
            ...postParams, 
            user
            });
        return this.postRepository.save(newPost);
    }
}
