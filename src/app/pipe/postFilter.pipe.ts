import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'postsFilter',
    pure: false
})

export class PostsFilterPipe implements PipeTransform {
    transform(items: any[], filter: string): any {
        console.log('pipe---', filter);
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.type == filter);
    }
}