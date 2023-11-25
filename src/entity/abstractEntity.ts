export abstract class AbstractEntity {
    fill(props: Object) {
        const self = this;
        Object.keys(props).forEach((key: string) => {
            (self as any)[key] = props[key as keyof typeof props];
        });

        return self;
    }

}