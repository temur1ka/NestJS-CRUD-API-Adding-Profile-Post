import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { userDto } from 'src/dto/user.dto';
import { UpdateUserDto } from 'src/dto/updateuser.dto';
import { ProfileDTO } from 'src/dto/profile.dto';
import { PostDto } from 'src/dto/createPost.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}


    @Get()
    getAll(){
        return this.userService.findAll()
    }

    @Post('/create')
    createUser(@Body() userdto: userDto){
        return this.userService.createUser(userdto)
    }

    @Put(':id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserdto:UpdateUserDto){
        await this.userService.updateUser(id, updateUserdto);

    }

    @Delete('/delete/:id')
    async deleteUser(@Param('id', ParseIntPipe) id:number) {
        await this.userService.deleteUsers(id)
        

    }

    @Post('/profile/:id')
    createProfile(@Param('id', ParseIntPipe) id: number,@Body() profileDto: ProfileDTO) {
        return this.userService.createProfile(id, profileDto)

    }

    @Post('/posts/:id')
    createPost(@Param('id', ParseIntPipe) id: number, @Body() createPostDto: PostDto) {
        return this.userService.createPost(id, createPostDto)

    }
}
