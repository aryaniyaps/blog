"use client";

import type { TocItem } from "pliny/mdx-plugins/remark-toc-headings";
import type { NestedTocItem, TOCInlineProps } from "pliny/ui/TOCInline";
import ScrollSpy from "react-scrollspy-navigation";

const createNestedList = (items: TocItem[]): NestedTocItem[] => {
	const nestedList: NestedTocItem[] = [];
	const stack: NestedTocItem[] = [];

	items.forEach((item) => {
		const newItem: NestedTocItem = { ...item };

		while (stack.length > 0 && stack[stack.length - 1].depth >= newItem.depth) {
			stack.pop();
		}

		const parent = stack.length > 0 ? stack[stack.length - 1] : null;

		if (parent) {
			parent.children = parent.children || [];
			parent.children.push(newItem);
		} else {
			nestedList.push(newItem);
		}

		stack.push(newItem);
	});

	return nestedList;
};

const TOCInline = ({
	toc,
	fromHeading = 1,
	toHeading = 6,
	asDisclosure = false,
	exclude = "",
	collapse = false,
	ulClassName = "list-decimal",
	liClassName = "",
}: TOCInlineProps) => {
	const re = Array.isArray(exclude)
		? new RegExp("^(" + exclude.join("|") + ")$", "i")
		: new RegExp("^(" + exclude + ")$", "i");

	const filteredToc = toc.filter(
		(heading) =>
			heading.depth >= fromHeading &&
			heading.depth <= toHeading &&
			!re.test(heading.value),
	);

	const createList = (items: NestedTocItem[] | undefined) => {
		if (!items || items.length === 0) {
			return <></>;
		}

		return (
			<ul className={ulClassName}>
				{items.map((item, index) => {
					return (
						<li key={index} className={liClassName}>
							<a href={item.url} className="no-underline text-foreground">
								{item.value}
							</a>
							{createList(item.children)}
						</li>
					);
				})}
			</ul>
		);
	};

	const nestedList = createNestedList(filteredToc);

	return (
		<>
			{asDisclosure ? (
				<details open={!collapse}>
					<summary className="ml-6 pb-2 pt-2 text-xl font-bold">
						Table of Contents
					</summary>
					<div className="ml-6">
						<ScrollSpy activeClass="font-bold">
							<nav>{createList(nestedList)}</nav>
						</ScrollSpy>
					</div>
				</details>
			) : (
				<ScrollSpy activeClass="font-bold">
					<nav>{createList(nestedList)}</nav>
				</ScrollSpy>
			)}
		</>
	);
};

export default TOCInline;
