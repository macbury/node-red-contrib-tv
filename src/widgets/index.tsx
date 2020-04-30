import Repository from './Repository'
import NumberWidget from './Number/index'
import CommentsWidget from './Comments/index'
import TextWidget from './Text/index'
import ListWidget from './List/index'

const repo = new Repository()

repo.register('tv_number', NumberWidget)
repo.register('tv_comments', CommentsWidget)
repo.register('tv_text', TextWidget)
repo.register('tv_list', ListWidget)

export default repo