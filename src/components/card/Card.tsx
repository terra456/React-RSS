import { HeartIcon } from '@heroicons/react/24/solid';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Typography,
} from '@material-tailwind/react';
import React from 'react';
import { CardType } from 'types';

class CardBlock extends React.Component {
  info: CardType;
  constructor(props: CardType) {
    super(props);
    this.info = props;
  }

  render() {
    return (
      <Card className="min-h-90 h-90 lg:h-90 lg:min-h-90 aspect-w-1 aspect-h-1 aspect-none w-full max-w-[26rem] overflow-hidden rounded-md bg-gray-200 shadow-lg group-hover:opacity-75 ">
        <CardHeader className="!relative" floated={false} color="blue-gray">
          <img
            src={'./assets/images/mini/' + this.info.picture + '.jpg'}
            alt={this.info.name.en}
            className="h-full w-full"
          />
          <IconButton size="sm" color="red" variant="text" className="!absolute top-1 right-1">
            <HeartIcon className="h-6 w-6" />
          </IconButton>
          <Typography variant="h6" className="!absolute bottom-1 right-1">
            {this.info.year}
          </Typography>
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h5" className="mb-1">
            {this.info.name.en}
          </Typography>
          <Typography variant="h6" className="mb-2">
            {this.info.author.en}
          </Typography>
          <Typography variant="small" className="overflow-hidden text-left">
            {this.info.desc}
          </Typography>
        </CardBody>
        <CardFooter divider className="flex items-center justify-items-start py-3">
          <Typography variant="small" className="mr-3">
            <i className="fa fa-thumbs-up mr-1"></i>
            {this.info.likes}
          </Typography>
          <Typography variant="small">
            <i className="fa fa-thumbs-down  mr-1"></i>
            {this.info.dislikes}
          </Typography>
          <Typography variant="small" color="gray" className="ml-auto flex gap-1">
            <i className="fas fa-eye fa-sm mt-2.5" />
            {this.info.watch}
          </Typography>
        </CardFooter>
      </Card>
    );
  }
}

export default CardBlock;
